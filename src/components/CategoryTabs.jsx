import React, { useState } from 'react';

const categories = [
  { id: 'all', label: 'All', icon: 'images/cash.svg' },
  { id: 'consultation', label: 'Consultation', icon: 'images/cardimg.svg' },
  { id: 'volume', label: 'Volume Filling', icon: 'images/checkbook.svg' },
  { id: 'hair', label: 'Hair Reduction', icon: 'images/advance.svg' },
  { id: 'facials', label: 'Facials', icon: 'images/loyalty.svg' }
];

const services = [
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 },
  { name: 'Skin Consultation', price: 100 }
];

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="srvlistdiv">
      <h3 className="sectttl">Categories</h3>
      <div className="pymntmode">
        <div className="pymttabswrp">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`pymnttab ${activeTab === cat.id ? 'activetab' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <img src={cat.icon} alt="" />
              <span className="pymttxt">{cat.label}</span>
            </div>
          ))}
        </div>

        <div className="pymntcnt actcont">
          <div className="ctlistwrp">
            <div className="ctheadwrp ctflx">
              <div className="ctlft ctcell">Service Name</div>
              <div className="ctrght ctcell">Price</div>
            </div>

            {services.map((service, idx) => (
              <div className="ctflx" key={idx}>
                <div className="ctlft ctcell">{service.name}</div>
                <div className="ctrght ctcell">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
