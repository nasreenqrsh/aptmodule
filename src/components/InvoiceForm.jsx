import React, { useState, useEffect } from 'react';

const createDataHandler = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
  return await response.json();
};

const SERVICE_API = 'https://mocki.io/v1/1bc921e8-e308-4863-bdab-a865eea49874';
const PRODUCT_API = 'https://mocki.io/v1/0e9466cb-00fe-4ed3-a324-e59c00cd6c81';
const PACKAGE_API = 'https://mocki.io/v1/75459841-da63-456c-9a16-59a57c74197c';

const InvoiceForm = ({ onAddItem, resetKey }) => {
  const [formData, setFormData] = useState({
    package: '',
    product: '',
    service: '',
    giftcard: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [fieldFocused, setFieldFocused] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchAllSuggestions = async () => {
      try {
        const [services, products, packages] = await Promise.all([
          createDataHandler(SERVICE_API),
          createDataHandler(PRODUCT_API),
          createDataHandler(PACKAGE_API)
        ]);

        const mergedSuggestions = [
          ...services.map(item => ({ type: 'service', ...item })),
          ...products.map(item => ({ type: 'product', ...item })),
          ...packages.map(item => ({ type: 'package', ...item }))
        ];
        setSuggestions(mergedSuggestions);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      }
    };

    fetchAllSuggestions();
  }, []);

  useEffect(() => {
    setFormData({ package: '', product: '', service: '', giftcard: '' });
    setFilteredSuggestions([]);
    setFieldFocused(null);
    setSelectedItem(null);
  }, [resetKey]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFieldFocused(field);

    let matches = [];
    if (field === 'package') {
      matches = suggestions.filter(
        s => s.type === 'package' && s.packageName?.toLowerCase().includes(value.toLowerCase())
      );
    } else if (field === 'product') {
      matches = suggestions.filter(
        s => s.type === 'product' && s.productname?.toLowerCase().includes(value.toLowerCase())
      );
    } else if (field === 'service') {
      matches = suggestions.filter(
        s => s.type === 'service' && s.servicename?.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredSuggestions(matches);
  };

  const handleSelect = (item) => {
    setFormData({
      package: item.packageName || '',
      product: item.productname || '',
      service: item.servicename || '',
      giftcard: ''
    });
    setFilteredSuggestions([]);
    setFieldFocused(null);
    setSelectedItem(item);
  };

  const handleAdd = () => {
    if (selectedItem) {
      const newItem = {
        name: selectedItem.servicename || selectedItem.productname || selectedItem.packageName || 'Unnamed Item',
        price: selectedItem.price || selectedItem.packageValue || 0,
        discount: ''
      };
      onAddItem(newItem);
    }
  };

  return (
    <form className="invform">
      <div className="frmwrpinv">
        {['package', 'product', 'service'].map((field) => (
          <div className="form-group" style={{ position: 'relative' }} key={field}>
            <input
              type="text"
              placeholder=" "
              id={field}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
            <label htmlFor={field} className="frmlbl">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {filteredSuggestions.length > 0 && fieldFocused === field && (
              <ul className="suggestion-list">
                {filteredSuggestions.map((item, idx) => (
                  <li key={idx} onClick={() => handleSelect(item)}>
                    {item.packageName || item.productname || item.servicename}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="form-group">
          <input
            type="text"
            placeholder=" "
            id="giftcard"
            value={formData.giftcard}
            onChange={(e) => handleChange('giftcard', e.target.value)}
          />
          <label htmlFor="giftcard" className="frmlbl">Gift Card</label>
        </div>

        <div className="form-group frmbtngrp">
          <button type="button" className="addbtn" onClick={handleAdd}>Add Product</button>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
