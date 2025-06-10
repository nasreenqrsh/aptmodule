import React, { useState, useEffect } from 'react';

const CUSTOMER_API = 'https://mocki.io/v1/77b82e0b-1d53-4056-af18-6021cbd5b873';
const createDataHandler = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
  return await response.json();
};

const CustomerSearch = ({ onCustomerSelect }) => {
  const [formData, setFormData] = useState({ mobile: '', name: '', email: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    createDataHandler(CUSTOMER_API).then(setSuggestions).catch(console.error);
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setFocusedField(field);

    const filtered = suggestions.filter((cust) =>
      (field === 'mobile' && cust.mobile?.includes(value)) ||
      (field === 'name' && cust.fullname?.toLowerCase().includes(value.toLowerCase())) ||
      (field === 'email' && cust.email?.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelect = (cust) => {
    setFormData({
      mobile: cust.mobile || '',
      name: cust.fullname || '',
      email: cust.email || ''
    });
    setFilteredSuggestions([]);
    setFocusedField(null);
    onCustomerSelect?.(cust);
  };

  return (
    <div className="cstsearch">
      <div className="sectttl">Customer Search</div>
      <form className="cstfrm">
        {['mobile', 'name', 'email'].map((field) => (
          <div className="frmdiv" style={{ position: 'relative' }} key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              id={field}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              onFocus={() => setFocusedField(field)}
            />
            {focusedField === field && filteredSuggestions.length > 0 && (
              <ul className="suggestion-list">
                {filteredSuggestions.map((cust, idx) => (
                  <li key={idx} onClick={() => handleSelect(cust)}>
                    {field === 'mobile' ? cust.mobile : field === 'name' ? cust.fullname : cust.email || 'No email'}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default CustomerSearch;