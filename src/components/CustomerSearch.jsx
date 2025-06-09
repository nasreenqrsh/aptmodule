import React, { useState, useEffect } from 'react';

const CUSTOMER_API = 'https://mocki.io/v1/61470ee6-44fe-44a3-ac78-95d8009a8c07';

const createDataHandler = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
  return await response.json();
};

const CustomerSearch = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    name: '',
    email: ''
  });

  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    createDataHandler(CUSTOMER_API)
      .then(setSuggestions)
      .catch(console.error);
  }, []);

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setFocusedField(field);

    const filtered = suggestions.filter((cust) =>
      (field === 'mobile' && cust.mobile?.toLowerCase().includes(value.toLowerCase())) ||
      (field === 'name' && cust.fullname?.toLowerCase().includes(value.toLowerCase())) ||
      (field === 'email' && cust.email?.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelect = (customer) => {
    setFormData({
      mobile: customer.mobile || '',
      name: customer.fullname || '',
      email: customer.email || ''
    });
    setFilteredSuggestions([]);
    setFocusedField(null);
  };

  return (
    <div className="cstsearch">
      <div className="sectttl">Customer Search</div>
      <form className="cstfrm">
        <div className="frmdiv" style={{ position: 'relative' }}>
          <label htmlFor="mobile">Mobile No: <span className="rd">*</span></label>
          <input
            type="text"
            id="mobile"
            value={formData.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            onFocus={() => setFocusedField('mobile')}
          />
          {focusedField === 'mobile' && filteredSuggestions.length > 0 && (
            <ul className="suggestion-list">
              {filteredSuggestions.map((cust, idx) => (
                <li key={idx} onClick={() => handleSelect(cust)}>
                  {cust.mobile}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="frmdiv" style={{ position: 'relative' }}>
          <label htmlFor="name">Name: <span className="rd">*</span></label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onFocus={() => setFocusedField('name')}
          />
          {focusedField === 'name' && filteredSuggestions.length > 0 && (
            <ul className="suggestion-list">
              {filteredSuggestions.map((cust, idx) => (
                <li key={idx} onClick={() => handleSelect(cust)}>
                  {cust.fullname}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="frmdiv" style={{ position: 'relative' }}>
          <label htmlFor="email">Email: <span className="rd">*</span></label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onFocus={() => setFocusedField('email')}
          />
          {focusedField === 'email' && filteredSuggestions.length > 0 && (
            <ul className="suggestion-list">
              {filteredSuggestions.map((cust, idx) => (
                <li key={idx} onClick={() => handleSelect(cust)}>
                  {cust.email || 'No email'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerSearch;
