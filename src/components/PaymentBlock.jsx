import React, { useState } from 'react';

const paymentModes = [
  { label: 'Cash', icon: 'images/cash.svg', key: 'cash' },
  { label: 'Credit/Debit', icon: 'images/cardimg.svg', key: 'credit' },
  { label: 'Check', icon: 'images/checkbook.svg', key: 'check' },
  { label: 'Advance', icon: 'images/advance.svg', key: 'advance' },
  { label: 'Loyalty', icon: 'images/loyalty.svg', key: 'loyalty' },
  { label: 'Other', icon: 'images/other.svg', key: 'other' }
];

const PaymentBlock = ({ totalAmount = 0 }) => {
  const [activeTab, setActiveTab] = useState('cash');
  const [amount, setAmount] = useState('');
  const [payments, setPayments] = useState([]);

  const handleAddPayment = () => {
    if (!amount || isNaN(amount)) return;

    const newPayment = {
      id: Date.now(),
      mode: paymentModes.find(m => m.key === activeTab)?.label,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };

    setPayments([...payments, newPayment]);
    setAmount('');
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const change = amount && !isNaN(amount) ? parseFloat(amount) - totalAmount : 0;

  const renderContent = () => {
    switch (activeTab) {
      case 'cash':
      case 'other':
        return (
          <div className="pymfrm">
            <div className="frmdiv">
              <label>Amount: </label>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="frmdiv">
              <label>Change: </label>
              <input type="text" readOnly value={change < 0 ? 0 : change.toFixed(2)} className="rdonly" />
            </div>
            {activeTab === 'other' && (
              <div className="frmdiv">
                <label>Select Payment Mode: </label>
                <select><option value="">Select</option><option>Online</option><option>Bank Transfer</option></select>
              </div>
            )}
            <div className="frmdiv">
              <button className="pribtnblue" onClick={handleAddPayment}>Add Payment</button>
            </div>
          </div>
        );
      case 'credit':
        return (
          <div className="pymfrm">
            <div className="frmdiv">
              <label>Card Type: </label>
              <select><option value="">Select</option><option>Debit Card</option><option>Credit Card</option></select>
            </div>
            <div className="frmdiv">
              <label>Card Number (last 4 digits): </label>
              <input type="text" />
            </div>
            <div className="frmdiv">
              <label>Amount: </label>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="frmdiv">
              <label>Change: </label>
              <input type="text" readOnly value={change < 0 ? 0 : change.toFixed(2)} className="rdonly" />
            </div>
            <div className="frmdiv">
              <label>Bank Name: </label>
              <input type="text" />
            </div>
            <div className="frmdiv">
              <label>Receipt Number: </label>
              <input type="text" />
            </div>
            <div className="frmdiv">
              <label>Expiry: </label>
              <input type="date" />
            </div>
            <div className="frmdiv">
              <button className="pribtnblue" onClick={handleAddPayment}>Add Payment</button>
            </div>
          </div>
        );
      case 'check':
        return (
          <div className="pymfrm">
            <div className="frmdiv">
              <label>Check Number: </label>
              <input type="text" />
            </div>
            <div className="frmdiv">
              <label>Amount: </label>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="frmdiv">
              <label>Change: </label>
              <input type="text" readOnly value={change < 0 ? 0 : change.toFixed(2)} className="rdonly" />
            </div>
            <div className="frmdiv">
              <label>Bank Name: </label>
              <input type="text" />
            </div>
            <div className="frmdiv">
              <label>Check Date: </label>
              <input type="date" />
            </div>
            <div className="frmdiv">
              <button className="pribtnblue" onClick={handleAddPayment}>Add Payment</button>
            </div>
          </div>
        );
      case 'advance':
        return (
          <div className="pymfrm">
            <div className="frmdiv">
              <label>Card Number: </label>
              <input type="text" />
            </div>
            <div className="frmdiv">
              <label>Amount: </label>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="frmdiv">
              <label>Change: </label>
              <input type="text" readOnly value={change < 0 ? 0 : change.toFixed(2)} className="rdonly" />
            </div>
            <div className="frmdiv">
              <button className="pribtnblue" onClick={handleAddPayment}>Add Payment</button>
            </div>
          </div>
        );
      case 'loyalty':
        return (
          <div className="pymfrm">
            <div className="frmdiv">
              <label>Loyalty: </label>
              <select><option value="">Select</option><option>Reward Points</option><option>Membership</option></select>
            </div>
            <div className="frmdiv">
              <label>Amount: </label>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="frmdiv">
              <label>Change: </label>
              <input type="text" readOnly value={change < 0 ? 0 : change.toFixed(2)} className="rdonly" />
            </div>
            <div className="frmdiv">
              <label>Points: </label>
              <input type="text" />
            </div>
            <div className="frmdiv">
              <button className="pribtnblue" onClick={handleAddPayment}>Add Payment</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pymntblock">
      <h3 className="sectttl">Mode of Payment</h3>
      <div className="pymntmode">
        <div className="pymttabswrp">
          {paymentModes.map((mode) => (
            <div
              key={mode.key}
              className={`pymnttab ${activeTab === mode.key ? 'activetab' : ''}`}
              onClick={() => setActiveTab(mode.key)}
            >
              <img src={mode.icon} alt={mode.label} />
              <span className="pymttxt">{mode.label}</span>
            </div>
          ))}
        </div>
        <div className="pymntcnt actcont">
          {renderContent()}
        </div>
       
      </div>

      <div className='pymntlines'>
         {payments.length > 0 && (
          <div className="payment-table">
            <h4 className='sectttl'>Payment Summary</h4>
            <table className='pymntlintbl'>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Mode</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.mode}</td>
                    <td>{p.amount.toFixed(2)}</td>
                    <td>{p.date}</td>
                    <td><button onClick={() => handleDelete(p.id)} className='removeln'>
                        <img src="images/rmove.svg" alt="Delete" />
                      </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentBlock;
