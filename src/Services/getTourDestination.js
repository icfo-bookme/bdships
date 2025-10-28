const getTourDestination = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tour/destinations`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const destinations = await response.json();     
      return destinations;    } catch (error) {
      console.error('Failed to fetch tour destinations:', error);
      return [];
    }  };

  export default getTourDestination;