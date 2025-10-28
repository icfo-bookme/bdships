'use client';

import { useEffect, useState, useRef, useCallback } from "react";

import { useRouter } from "next/navigation";
import { LuMapPin } from "react-icons/lu";
import SearchButton from "@/utils/SearchButton";
import slugify from "@/utils/slugify";
import useScrollOnFocus from "@/Hooks/useScrollOnFocus";
import getTourDestination from "@/Services/getTourDestination";

const ShipsSearch = () => {
  const router = useRouter();
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isFirstInputInteraction, setIsFirstInputInteraction] = useState(true);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [showDestination, setShowDestination] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputRef, handleClick] = useScrollOnFocus(150);
  const searchRef = useRef(null);
  const animationIntervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTourDestination();
        if (response?.success) {
          const visibleDestinations = response.data.filter((dest) => dest.isShow === "yes");
          setDestinations(visibleDestinations);
          
          // Start showing destinations after a brief delay
          setTimeout(() => {
            setShowDestination(true);
          }, 1000);
        }
      } catch (error) {
        setError("Failed to load destinations");
        console.error("Error loading destinations:", error);
      }
    };

    fetchData();
  }, []);

  // Start animation when component mounts and destinations are loaded
  const startAnimation = useCallback(() => {
    if (!destinations.length || !showDestination || isInputFocused) return;

    // Clear any existing interval
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    animationIntervalRef.current = setInterval(() => {
      // Start exit animation (move up and out)
      setAnimationClass('animate-slideOutUp');
      
      // After exit animation, change destination and start enter animation
      setTimeout(() => {
        setCurrentDestinationIndex((prevIndex) => 
          (prevIndex + 1) % destinations.length
        );
        setAnimationClass('animate-slideInDown');
        
        // Reset animation class after enter animation completes
        setTimeout(() => {
          setAnimationClass('');
        }, 900);
      }, 900);
    }, 3000); 
  }, [destinations, showDestination, isInputFocused]);

  // Stop animation
  const stopAnimation = useCallback(() => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  }, []);

  // Handle animation based on focus state
  useEffect(() => {
    if (isInputFocused) {
      stopAnimation();
    } else {
      startAnimation();
    }

    // Cleanup on unmount
    return () => {
      stopAnimation();
    };
  }, [isInputFocused, startAnimation, stopAnimation]);

  // Get current destination for display
  const getCurrentDestination = () => {
    if (!destinations.length) return "";
    const currentDest = destinations[currentDestinationIndex];
    return `${currentDest.name}, ${currentDest.country}`;
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculateMatchScore = (item, query) => {
    if (!query) return 0;

    const itemName = item?.name?.toLowerCase();
    const itemLocation = item?.country?.toLowerCase();
    const itemFullText = `${itemName}, ${itemLocation}`.toLowerCase();
    const queryText = query.toLowerCase().trim();

    if (itemName === queryText) return 1000;
    if (itemFullText === queryText) return 950;

    if (itemFullText.includes(queryText)) {
      const matchPos = itemFullText.indexOf(queryText);
      return 900 + (matchPos === 0 ? 50 : 0);
    }

    if (itemName.startsWith(queryText)) return 850;

    if (itemName.includes(queryText)) {
      const matchPos = itemName.indexOf(queryText);
      return 800 + (50 - Math.min(matchPos, 50));
    }

    const queryWords = queryText.split(/\s+/);
    const allWordsMatch = queryWords.every(word =>
      (itemName || '').includes(word) || (itemLocation || '').includes(word)
    );
    if (allWordsMatch) {
      const matchedWordsCount = queryWords.filter(word =>
        itemName.includes(word)
      ).length;
      return 700 + (matchedWordsCount * 50);
    }

    let partialMatchScore = 0;
    for (let i = 0; i <= queryText.length - 3; i++) {
      const substring = queryText.substring(i, i + 3);
      if (itemName.includes(substring)) {
        const pos = itemName.indexOf(substring);
        partialMatchScore += 100 +
          (substring.length * 20) +
          (pos === 0 ? 50 : (pos < 3 ? 30 : 0));
      }
    }

    if (partialMatchScore > 0) return Math.min(partialMatchScore, 699);

    let charMatchScore = 0;
    let queryIndex = 0;
    for (let i = 0; i < itemName.length && queryIndex < queryText.length; i++) {
      if (itemName[i] === queryText[queryIndex]) {
        charMatchScore += 10;
        queryIndex++;
      }
    }

    return Math.min((charMatchScore / queryText.length) * 100, 600);
  };

  const updateSuggestions = (query) => {
    if (!query) {
      const defaultSuggestions = destinations.map(dest => ({
        ...dest,
        type: 'destination',
        score: 0,
        displayName: `${dest.name}, ${dest.country}`
      }));
      setSuggestions(defaultSuggestions);
      return;
    }

    const scoredItems = destinations.map(dest => ({
      ...dest,
      type: 'destination',
      score: calculateMatchScore(dest, query),
      displayName: `${dest.name}, ${dest.country}`
    }));

    const sorted = scoredItems
      .filter(item => item.score > 50)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
        const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());

        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;

        const aNameLength = a.name.length;
        const bNameLength = b.name.length;
        if (aNameLength !== bNameLength) return aNameLength - bNameLength;

        return a.displayName.localeCompare(b.displayName);
      });

    setSuggestions(sorted);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    updateSuggestions(query);

    if (!query) {
      setSelectedLocationId("");
    }
  };

  const handleSearchFocus = () => {
    setIsInputFocused(true);
    
    if (isFirstInputInteraction) {
      setIsFirstInputInteraction(false);
      setSearchQuery("");
      setSelectedLocationId("");
      setSuggestions(destinations.map(d => ({ ...d, type: 'destination' })));
    } else {
      updateSuggestions(searchQuery);
    }
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setIsInputFocused(false);
  };

  const selectItem = (item) => {
    setSearchQuery(`${item.name}, ${item.country}`);
    setSelectedLocationId(item.id);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedLocationId) {
      alert("Please select a valid destination");
      return;
    }

    const selectedDestination = destinations.find(dest => dest.id === selectedLocationId);

    if (selectedDestination) {
      const destinationSlug = slugify(selectedDestination.name);
      router.push(`/ships/${destinationSlug}/${selectedLocationId}`);
    } else {
      router.push(`/tour/${selectedLocationId}`);
    }
  };

  const highlightMatches = (text, query) => {
    if (!query) return text;

    const queryChars = new Set(query.toLowerCase());
    return (
      <>
        {text.split("").map((char, idx) => (
          queryChars.has(char.toLowerCase()) ? (
            <span key={idx} className="font-bold text-blue-600">{char}</span>
          ) : (
            <span key={idx}>{char}</span>
          )
        ))}
      </>
    );
  };

  if (error) {
    return (
      <div className="bg-white max-w-5xl mx-auto pb-6 text-center">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-5xl rounded-2xl mx-auto p-10 text-blue-950 relative">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 gap-4 " ref={searchRef}>
          <div className="space-y-1 relative">
            <label className="block text-sm text-blue-950 font-medium">LOCATION/TOUR</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LuMapPin className="h-5 w-5 text-blue-600" />
              </div>
              <input
                type="text"
                ref={inputRef}
                value={searchQuery}
                onClick={handleClick}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder=""
                className="p-3 h-12 border border-gray-300 rounded-lg hover:border-blue-900 focus:border-blue-900 focus:ring-0 transition-colors w-full font-bold text-blue-950 text-lg pl-10"
              />
              
              {/* Animated placeholder text */}
              {!searchQuery && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden h-6 flex items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 hidden lg:block font-bold">Search Ships For</span>
                    {showDestination && destinations.length > 0 && (
                      <span className={`text-gray-400 font-bold transition-all duration-500 ${animationClass}`}>
                        &quot;{getCurrentDestination()}&quot;
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {suggestions.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 hover:bg-blue-50 cursor-pointer text-sm sm:text-base flex justify-between items-center"
                    onClick={() => selectItem(item)}
                  >
                    <div>
                      {highlightMatches(item.name, searchQuery)},{" "}
                      {highlightMatches(item.country, searchQuery)}
                    </div>
                    {idx === 0 && item.score > 50 && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded whitespace-nowrap">
                        Best match
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute text-sm  md:text-lg mt-3 md:mt-6 left-1/2 -translate-x-1/2 flex justify-end">
          <SearchButton type="submit">Search Ships</SearchButton>
        </div>
      </form>

     
    </div>
  );
};

export default ShipsSearch;