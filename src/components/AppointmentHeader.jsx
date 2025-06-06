import React, { useState, useRef, useEffect } from "react";
import "../index.css";

const AppointmentHeader = ({ onAddAppointment, onAddCustomer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Formats date as 'YYYY-MM-DD'
    setTodayDate(formattedDate);
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    try {
      const response = await fetch(`/GetCustomerHandler.ashx?firstname=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();

      const filtered = data.filter((item) =>
        item.firstname.toLowerCase().includes(query.toLowerCase()) ||
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
    const fullText = `${item.firstname} - ${item.mobile}`;
    setSearchTerm(fullText);
    setSuggestions([]);
    setActiveIndex(-1);
    console.log("Selected:", item);
  };

  const handleBookAppointment = (item) => {
    console.log("Booking appointment for:", item);
    setSuggestions([]);
    setActiveIndex(-1);
    setSearchTerm("");
    if (onAddAppointment) onAddAppointment(item);
  };

  return (
    <header className="appthdr">
      <div className="flx-spcbt">
        <div style={{ width: "300px" }}></div>

        <div className="datepkrdiv">
          <input type="date" id="date" defaultValue={todayDate}/>
        </div>

        <div className="actbtnsdiv">
          <div
            className="apptimg tooltip"
            data-tooltip="Add Appointment"
            data-tooltip-pos="down"
            onClick={onAddAppointment}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/addappt.svg`}
              alt="Add Appointment"
            />
          </div>

          <div
            className="apptstgs tooltip"
            data-tooltip="Settings"
            data-tooltip-pos="down"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/settings.svg`}
              alt="Settings"
            />
          </div>

          <span
            className="apptstgs tooltip"
            data-tooltip="Add Customer"
            data-tooltip-pos="down"
            onClick={onAddCustomer}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/addcustwhite.svg`}
              alt="Add Customer"
            />
          </span>

          <img
            src={`${import.meta.env.BASE_URL}images/reports.svg`}
            alt="View Reports"
          />

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
                        backgroundColor:
                          index === activeIndex ? "#eef" : "transparent",
                        padding: "4px 8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{item.firstname} – {item.mobile}</span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookAppointment(item);
                        }}
                        className="bookappt"
                      >
                        <img
                          src={`${import.meta.env.BASE_URL}images/addapptblk.svg`}
                          alt="Book"
                        />
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
