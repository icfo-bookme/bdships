const SearchButton = ({ children }) => (
  <button className="px-6  py-3 bg-gradient-to-r from-[#313881] to-[#0678B4] text-white font-medium rounded-lg hover:from-blue-800 hover:to-blue-800 transition-colors shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50">    {children}
  </button>
);

export default SearchButton;