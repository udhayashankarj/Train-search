import React, { useState, useEffect, useRef } from "react";

// The list of all possible train stations
const stopNames = [
  "New Delhi",
  "Mumbai Central",
  "Howrah Junction",
  "Chennai Central",
  "Bengaluru City",
  "Kolkata Sealdah",
  "Pune Junction",
  "Hyderabad Deccan",
  "Ahmedabad Junction",
  "Jaipur Junction",
  "Lucknow Charbagh",
  "Patna Junction",
  "Bhopal Junction",
  "Nagpur Junction",
  "Kanpur Central",
  "Varanasi Junction",
  "Agra Cantt",
  "Secunderabad Junction",
  "Thiruvananthapuram Central",
  "Ernakulam Junction",
  "Visakhapatnam",
  "Bhubaneswar",
  "Guwahati",
  "Amritsar Junction",
  "Chandigarh",
  "Jodhpur Junction",
  "Udaipur City",
  "Indore Junction",
  "Jabalpur",
  "Raipur Junction",
  "Ranchi Junction",
  "Dhanbad Junction",
  "Gaya Junction",
  "Prayagraj Junction",
  "Gorakhpur Junction",
  "Dehradun",
  "Haridwar",
  "Mathura Junction",
  "Gwalior Junction",
  "Jhansi Junction",
  "Itarsi Junction",
  "Vijayawada Junction",
  "Madurai Junction",
  "Coimbatore Junction",
  "Mangaluru Central",
  "Vasco da Gama",
  "Yesvantpur Junction",
  "Hazrat Nizamuddin",
  "Anand Vihar Terminal",
  "Lokmanya Tilak Terminus",
];

/**
 * A reusable input component with a searchable dropdown.
 * @param {string} value - The current value of the input from the parent's state.
 * @param {function} onChange - The function to call when the input value changes.
 * @param {string} placeholder - The placeholder text for the input.
 * @param {string} id - The id for the input element.
 */
export const SearchInput = ({ value, onChange, placeholder, id }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredStops, setFilteredStops] = useState([]);
  const wrapperRef = useRef(null); // To detect clicks outside the component

  // Effect to filter the station list whenever the input value changes
  useEffect(() => {
    if (value) {
      const lowercasedValue = value.toLowerCase();
      const filtered = stopNames.filter((stop) =>
        stop.toLowerCase().includes(lowercasedValue)
      );
      setFilteredStops(filtered);
    } else {
      // If the input is empty, you might want to show all stops or none.
      // Here, we'll show all stops when the dropdown is open and the input is empty.
      setFilteredStops(stopNames);
    }
  }, [value]);

  // Effect to handle clicks outside the component to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Function to handle selecting a station from the dropdown
  const handleSelectStation = (stationName) => {
    onChange(stationName); // Update the parent component's state
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        id={id}
        type="text"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
        className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        placeholder={placeholder}
        autoComplete="off" // Turn off browser's default autocomplete
      />
      {/* Conditionally render the dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredStops.length > 0 ? (
            <ul>
              {filteredStops.map((station, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectStation(station)}
                  className="px-4 py-2 text-sm text-gray-300 cursor-pointer hover:bg-emerald-600 hover:text-white"
                >
                  {station}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No stations found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
