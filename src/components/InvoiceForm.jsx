import React, { useState, useEffect } from 'react';

const InvoiceForm = ({ suggestions, onAddItem, resetKey }) => {
  const [formData, setFormData] = useState({
    package: '',
    product: '',
    service: '',
    giftcard: ''
  });
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [fieldFocused, setFieldFocused] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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
      matches = suggestions.filter((s) =>
        s.packageName?.toLowerCase().includes(value.toLowerCase())
      );
    } else if (field === 'product') {
      matches = suggestions.filter((s) =>
        s.product?.toLowerCase().includes(value.toLowerCase())
      );
    } else if (field === 'service') {
      matches = suggestions.filter((s) =>
        s.serviceName?.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredSuggestions(matches);
  };

  const handleSelect = (item) => {
    setFormData({
      package: item.packageName || '',
      product: item.product || '',
      service: item.serviceName || '',
      giftcard: '',
    });
    setFilteredSuggestions([]);
    setFieldFocused(null);
    setSelectedItem(item);
  };

  const handleAdd = () => {
    if (selectedItem) {
      const newItem = {
        name: selectedItem.serviceName || selectedItem.packageName || 'Unnamed Item',
        price: selectedItem.packageValue || 0,
        discount: ''
      };
      onAddItem(newItem);
    }
  };

  return (
    <form className="invform">
      <div className="frmwrpinv">
        <div className="form-group" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder=" "
            id="package"
            value={formData.package}
            onChange={(e) => handleChange('package', e.target.value)}
          />
          <label htmlFor="package" className="frmlbl">Package</label>
          {filteredSuggestions.length > 0 && fieldFocused === 'package' && (
            <ul className="suggestion-list">
              {filteredSuggestions.map((item, idx) => (
                <li key={idx} onClick={() => handleSelect(item)}>
                  {item.packageName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder=" "
            id="product"
            value={formData.product}
            onChange={(e) => handleChange('product', e.target.value)}
          />
          <label htmlFor="product" className="frmlbl">Product</label>
          {filteredSuggestions.length > 0 && fieldFocused === 'product' && (
            <ul className="suggestion-list">
              {filteredSuggestions.map((item, idx) => (
                <li key={idx} onClick={() => handleSelect(item)}>
                  {item.product}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder=" "
            id="service"
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
          />
          <label htmlFor="service" className="frmlbl">Service</label>
          {filteredSuggestions.length > 0 && fieldFocused === 'service' && (
            <ul className="suggestion-list">
              {filteredSuggestions.map((item, idx) => (
                <li key={idx} onClick={() => handleSelect(item)}>
                  {item.serviceName}
                </li>
              ))}
            </ul>
          )}
        </div>

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

        <div className="form-group slctgrp">
          <select id="docSelect" value={selectedItem?.practitioner || ''} readOnly>
            <option value="">Select Practitioner</option>
            {suggestions.map((item, idx) => (
              <option key={idx} value={item.practitioner}>{item.practitioner}</option>
            ))}
          </select>
        </div>

        <div className="form-group frmbtngrp">
          <button type="button" className="addbtn" onClick={handleAdd}>Add Product</button>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
