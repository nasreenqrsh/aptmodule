import React, { useState, useEffect } from 'react';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceSummary from '../components/InvoiceSummary';
import CustomerSearch from '../components/CustomerSearch';
import PaymentBlock from '../components/PaymentBlock';
import CategoryTabs from '../components/CategoryTabs';
import InvoiceTable from '../components/InvoiceTable';
import Toast from '../components/Toast';
import '../pages/styles/InvoicePage.css';

const createDataHandler = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return await response.json();
};

const InvoicePage = () => {
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [formResetKey, setFormResetKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [suspendedCarts, setSuspendedCarts] = useState([]);
  const [isFinalized, setIsFinalized] = useState(false);
  const [toast, setToast] = useState(null);


  useEffect(() => {
    createDataHandler('https://mocki.io/v1/4df5effa-1606-474c-9ba3-f54eb1142034')
      .then(setSuggestions)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('suspendedCarts') || '[]');
    setSuspendedCarts(saved);
  }, [items]);

  const handlePriceChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].price = value;
    setItems(updatedItems);
  };

  const handleDiscountChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].discount = value;
    setItems(updatedItems);
  };

  const handleRemove = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleAddItem = () => {
    setItems([...items, { name: 'New Item', price: '', discount: '' }]);
  };

  const handleAddFormItem = (newItem) => {
    setItems(prev => [...prev, newItem]);
    setFormResetKey(prev => prev + 1);
  };

  const handleSave = () => {
    localStorage.setItem('invoiceData', JSON.stringify(items));
    alert('Invoice saved to local storage');
  };

  const handlePrint = () => window.print();

  const handleClearCart = () => {
    setItems([]);
  };

  const handleSuspendCart = () => {
    if (items.length === 0) return;

    const suspended = JSON.parse(localStorage.getItem('suspendedCarts') || '[]');
    const cartWithMeta = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      items: items
    };
    suspended.push(cartWithMeta);
    localStorage.setItem('suspendedCarts', JSON.stringify(suspended));
    setSuspendedCarts(suspended);
    setItems([]);
  };

  const handleRecallCartById = (cartId) => {
    if (!cartId) return;

    const saved = JSON.parse(localStorage.getItem('suspendedCarts') || '[]');
    const selected = saved.find(cart => cart.id.toString() === cartId);
    if (selected) {
      setItems(selected.items);
      const updated = saved.filter(cart => cart.id.toString() !== cartId);
      localStorage.setItem('suspendedCarts', JSON.stringify(updated));
      setSuspendedCarts(updated);
    }
  };

  const handleManualDiscount = (updatedItems) => {
    setItems(updatedItems);
  };

  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);
  const discount = items.reduce((sum, i) => sum + (Number(i.discount) || 0), 0);
  const net = subtotal - discount;
  const tax = net * 0.15;
  const roundoff = 0;
  const total = net + tax + roundoff;

  const todayDate = new Date().toISOString().split('T')[0];
  const lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber') || '1000', 10);
  const currentInvoiceNumber = lastInvoiceNumber + 1;
  localStorage.setItem('lastInvoiceNumber', currentInvoiceNumber.toString());

  return (
    <div className="invoice-page">
      <header className="hdrclass">
        <h1 className="hdrttl">Create New Invoice</h1>
      </header>

      <main className="invoicewrp">
        <div className="invflex">
          <div className="leftsect">
            <div className="invtopwrp">
              <h3 className="sectttl">Invoice details  
                
                <a href="" title='' className='bckbtn'> <img src={`${import.meta.env.BASE_URL}images/back.svg`} alt="Collapse" />Back</a>
                 </h3>
              <div className="invdetails">
                {[{ label: 'Invoice No.', value: currentInvoiceNumber }, { label: 'Invoice Date', value: todayDate }, { label: 'Clinic Name', value: 'Bright Clinic' }]
                  .map(({ label, value }, index) => (
                    <div className="inventry" key={index}>
                      <label className="inlbl">{label}</label>
                      <input type="text" className="invinp" value={value} readOnly />
                    </div>
                  ))}
              </div>
              <div className="formdivwrp">
                <InvoiceForm
                  suggestions={suggestions}
                  onAddItem={handleAddFormItem}
                  resetKey={formResetKey}
                />
              </div>
            </div>
            <InvoiceTable
              items={items}
              onRemove={handleRemove}
              readOnlyInputs={true}
            />
            <InvoiceSummary
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              onManualDiscount={handleManualDiscount}
              onClearCart={handleClearCart}
              onSuspendCart={handleSuspendCart}
              onRecallCartById={handleRecallCartById}
              suspendedCarts={suspendedCarts}
              items={items}
              onPriceChange={handlePriceChange}
              onDiscountChange={handleDiscountChange}
              onRemove={handleRemove}
              isFinalized={isFinalized}
              setIsFinalized={setIsFinalized}
            />
            <div className="invtotalblk">
              <CustomerSearch />
              <div className="invttlwrp">
                {[{ label: 'Sub Total', value: subtotal }, { label: 'Discount', value: discount }, { label: 'Tax', value: tax }, { label: 'Round Off', value: roundoff }, { label: 'Total', value: total }]
                  .map(({ label, value }, idx) => (
                    <div className={`invntry ${label === 'Total' ? 'lst' : ''}`} key={idx}>
                      <label className="invlftlbl">{label}</label>
                      <input type="number" className="invtxt" value={value.toFixed(2)} readOnly />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <aside className="rgtsect">
            <CategoryTabs onAddItem={handleAddFormItem} showToast={(msg) => setToast({ message: msg, type: 'success' })}/>

            <PaymentBlock totalAmount={total.toFixed(2)} />
          </aside>
        </div>
      </main>
      {toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast(null)}
  />
)}
    </div>
    
  );
};

export default InvoicePage;
