import React, { useState, useEffect } from 'react';

const createDataHandler = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}`);
  }
  return await response.json();
};

const CATEGORY_API = 'https://mocki.io/v1/c66a9494-8044-46d6-8cd6-9295e367ac1b';
const SERVICE_API = 'https://mocki.io/v1/a1e7901c-1fd0-4e47-8954-c1d9e5899c90';
const PACKAGE_API = 'https://mocki.io/v1/75459841-da63-456c-9a16-59a57c74197c';

const CategoryTabs = ({ onAddItem, showToast }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [categories, setCategories] = useState([
    { id: 'all', label: 'All', icon: 'images/cash.svg' }
  ]);
  const [allServices, setAllServices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [packageSearchTerm, setPackageSearchTerm] = useState('');
  const [showPackageSearch, setShowPackageSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, servicesData, packagesData] = await Promise.all([
          createDataHandler(CATEGORY_API),
          createDataHandler(SERVICE_API),
          createDataHandler(PACKAGE_API)
        ]);

        const mappedCategories = categoriesData.slice(0, 4).map((item) => ({
          id: item.Ccode.toLowerCase(),
          label: item.CName,
          icon: getCategoryIcon(item.CName)
        }));

        const enrichedServices = servicesData.map((svc) => ({
          ...svc,
          categoryCode: mapServiceToCategory(svc.servicename)
        }));

        setCategories([
          { id: 'all', label: 'All', icon: 'images/cash.svg' },
          ...mappedCategories
        ]);
        setAllServices(enrichedServices);
        setAllPackages(packagesData.slice(0, 4)); // Limit to 4
      } catch (error) {
        console.error('Data fetch failed:', error);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes('consult')) return 'images/cardimg.svg';
    if (lower.includes('volume')) return 'images/checkbook.svg';
    if (lower.includes('hair')) return 'images/advance.svg';
    if (lower.includes('anti')) return 'images/loyalty.svg';
    return 'images/default.svg';
  };

  const mapServiceToCategory = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('volume')) return 'cc048';
    if (lower.includes('consult')) return 'cc07';
    if (lower.includes('anti')) return 'cc04';
    if (lower.includes('hair')) return 'cc025';
    return 'uncategorized';
  };

  const truncateName = (name, maxLength = 20) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

  const filteredServices = allServices.filter((svc) => {
    const matchesTab = activeTab === 'all' || svc.categoryCode === activeTab;
    const matchesSearch = svc.servicename
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredPackages = allPackages.filter((pkg) =>
    pkg.packageName.toLowerCase().includes(packageSearchTerm.toLowerCase())
  );

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
              <img src={cat.icon} alt={cat.label} />
              <span className="pymttxt">{cat.label}</span>
            </div>
          ))}
        </div>

        <div className="pymntcnt actcont">
          {/* Services Section */}
          <div className="servcont">
            <div className="servhead" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="sectttl smlsect">Services</h3>
              <div className="srchdiv">
                {showSearch && (
                  <div className="searchbar">
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        padding: '6px 10px',
                        width: '100%',
                        borderRadius: '6px',
                        border: '1px solid #ccc'
                      }}
                    />
                  </div>
                )}
                <span className='srchbtn'>
                  <img
                    src="images/searchn.svg"
                    alt="Search"
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    onClick={() => setShowSearch(!showSearch)}
                  />
                </span>
              </div>
            </div>

            <div className="ctlistwrp">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, idx) => (
                  <div
  className="ctflx"
  key={idx}
  onClick={() => {
  onAddItem?.({
    name: service.servicename,
    price: parseFloat(service.price) || 0,
    discount: 0,
  });
  showToast?.("Service added to invoice");
}}
>
  <div className="ctlft ctcell" title={service.servicename}>
    {truncateName(service.servicename)}
  </div>
</div>
                ))
              ) : (
                <div className="notext">No services found</div>
              )}
            </div>
          </div>

          {/* Packages Section */}
          <div className="pkgcont" style={{ marginTop: '10px' }}>
            <div className="servhead" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="sectttl smlsect">Packages</h3>
              <div className="srchdiv">
                {showPackageSearch && (
                  <div className="searchbar">
                    <input
                      type="text"
                      placeholder="Search packages..."
                      value={packageSearchTerm}
                      onChange={(e) => setPackageSearchTerm(e.target.value)}
                      style={{
                        padding: '6px 10px',
                        width: '100%',
                        borderRadius: '6px',
                        border: '1px solid #ccc'
                      }}
                    />
                  </div>
                )}
                <span className='srchbtn'>
                  <img
                    src="images/searchn.svg"
                    alt="Search"
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    onClick={() => setShowPackageSearch(!showPackageSearch)}
                  />
                </span>
              </div>
            </div>

            <div className="ctlistwrp">
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg, idx) => (
                  <div
  className="ctflx"
  key={idx}
  onClick={() => {
  onAddItem?.({
    name: pkg.packageName,
    price: parseFloat(pkg.price) || 0,
    discount: 0,
  });
  showToast?.("Package added to invoice");
}}
>
  <div className="ctlft ctcell" title={pkg.packageName}>
    {truncateName(pkg.packageName)}
  </div>
</div>

                ))
              ) : (
                <div className="notext">No packages found</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
