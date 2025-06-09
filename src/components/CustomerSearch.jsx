import React from 'react';

const CustomerSearch = () => {
  return (
    <div className="cstsearch">
      <div className="sectttl">Customer Search</div>
      <form className="cstfrm">
        {[
          { id: 'mob', label: 'Mobile No:' },
          { id: 'mob1', label: 'Name:' },
          { id: 'mob3', label: 'Email:' },
        ].map(({ id, label }, index) => (
          <div className="frmdiv" key={index}>
            <label htmlFor={id}>{label} <span className="rd">*</span></label>
            <input type="text" id={id} />
          </div>
        ))}
      </form>
    </div>
  );
};

export default CustomerSearch;
