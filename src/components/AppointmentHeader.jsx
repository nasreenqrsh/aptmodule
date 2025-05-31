import React, { useState, useRef } from "react";
import "../index.css";

// Fetches suggestions
const CreateDataHandler = async () => {
  const response = await fetch("https://mocki.io/v1/fe1da8d7-3afa-4866-bb24-553db358f743");
  if (!response.ok) throw new Error("Failed to fetch data");
  return await response.json();
};

const AppointmentHeader = ({ onAddAppointment, onAddCustomer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    try {
      const data = await CreateDataHandler();
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.mobile.includes(query)
      );
      setSuggestions(filtered);
      setActiveIndex(0);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        console.log("Search triggered for:", searchTerm);
      }
    }
  };

  const handleSuggestionClick = (item) => {
    const fullText = `${item.name} - ${item.mobile}`;
    setSearchTerm(fullText);
    setSuggestions([]);
    setActiveIndex(-1);
    console.log("Selected:", item); // Replace with search action
  };

  const handleBookAppointment = (item) => {
  console.log("Booking appointment for:", item);
  setSuggestions([]);        //  Close suggestions
  setActiveIndex(-1);        //  Reset active index
  setSearchTerm("");         // (Optional) clear search bar
  if (onAddAppointment) onAddAppointment(item);
};

  return (
    <header className="appthdr">
      <div className="flx-spcbt">
        <div style={{ width: "300px" }}></div>

        <div className="datepkrdiv">
          <input type="date" id="date" />
        </div>

        <div className="actbtnsdiv">
          <div
            className="apptimg tooltip"
            data-tooltip="Add Appointment"
            data-tooltip-pos="down"
            onClick={onAddAppointment}
          >
            <img src="/images/addappt.svg" alt="Add Appointment" />
          </div>

          <div
            className="apptstgs tooltip"
            data-tooltip="Settings"
            data-tooltip-pos="down"
          >
            <img src="/images/settings.svg" alt="Settings" />
          </div>

          <span
            className="apptstgs tooltip"
            data-tooltip="Add Customer"
            data-tooltip-pos="down"
            onClick={onAddCustomer}
          >
            <img src="/images/addcustwhite.svg" alt="Add Customer" />
          </span>

          <div
            className="apptstgs tooltip"
            data-tooltip="View Reports"
            data-tooltip-pos="down"
          >
            <img src="/images/reports.svg" alt="View Reports" />
          </div>

          {/* Search Field */}
          <div className="search-container" style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                id="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                }}
              >
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="suggestionssrc" ref={suggestionsRef}>
                <ul>
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(item)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: index === activeIndex ? "#eef" : "transparent",
                        padding: "4px 8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{item.name} – {item.mobile}</span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookAppointment(item);
                        }}
                        className="bookappt"
                      >
                        <img src="/images/addapptblk.svg" alt="" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentHeader;
