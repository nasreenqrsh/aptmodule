import React, { useState, useEffect } from 'react';

const paymentModes = [
  { label: 'Cash', icon: 'images/cash.svg', key: 'cash' },
  { label: 'Credit/Debit', icon: 'images/cardimg.svg', key: 'credit' },
  { label: 'Check', icon: 'images/checkbook.svg', key: 'check' },
  { label: 'Advance', icon: 'images/advance.svg', key: 'advance' },
  { label: 'Loyalty', icon: 'images/loyalty.svg', key: 'loyalty' },
  { label: 'Other', icon: 'images/other.svg', key: 'other' }
];

const PaymentBlock = ({ totalAmount = 0, prefillPaymentData }) => {
  const [activeTab, setActiveTab] = useState('cash');
  const [amount, setAmount] = useState('');
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (prefillPaymentData) {
      setFormData(prefillPaymentData.fields || {});
      setAmount(prefillPaymentData.amount || '');
      setActiveTab(prefillPaymentData.mode || 'cash');
    }
  }, [prefillPaymentData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id || e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setFormError('Please enter a valid amount.');
      return false;
    }
    if (activeTab === 'credit') {
      const { cardType, cardNumber, bankName, receipt, expiry } = formData;
      if (!cardType || !cardNumber || !bankName || !receipt || !expiry) {
        setFormError('Please fill all credit card details.');
        return false;
      }
    }
    if (activeTab === 'check') {
      const { checkNumber, bankName, checkDate } = formData;
      if (!checkNumber || !bankName || !checkDate) {
        setFormError('Please complete all check details.');
        return false;
      }
    }
    if (activeTab === 'loyalty') {
      const { loyaltyType, points } = formData;
      if (!loyaltyType || !points) {
        setFormError('Please provide loyalty type and points.');
        return false;
      }
    }
    setFormError('');
    return true;
  };

  const handleAddPayment = () => {
    if (!validateForm()) return;

    const newPayment = {
      id: Date.now(),
      mode: paymentModes.find(m => m.key === activeTab)?.label,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };

    setPayments([...payments, newPayment]);
    setAmount('');
    setFormData({});
    setFormError('');
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const submitPaymentsHandler = async (payload) => {
    try {
      const response = await fetch('/SubmitPaymentsHandler.ashx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error('Payment submission error:', err);
      return { success: false, message: err.message };
    }
  };

  const handleSubmitPayments = async () => {
    if (payments.length === 0) {
      setFormError('Please add at least one payment method.');
      return;
    }
    const payload = {
      payments,
      totalAmount,
      timestamp: new Date().toISOString(),
    };
    const res = await submitPaymentsHandler(payload);
    if (res.success) {
      setPayments([]);
      setToast({ message: 'Payments submitted successfully!', type: 'success' });
    } else {
      setToast({ message: res.message || 'Payment submission failed', type: 'error' });
    }
  };

  const change = amount && !isNaN(amount) ? parseFloat(amount) - totalAmount : 0;

  return (
    <div className="pymntblock">
      <h3 className="sectttl">Mode of Payment</h3>
      {/* Tabs */}
     <div className='outpymnt'>
         <div className="pymttabswrp">
        {paymentModes.map((mode) => (
          <div
            key={mode.key}
            className={`pymnttab ${activeTab === mode.key ? 'activetab' : ''}`}
            onClick={() => {
              setActiveTab(mode.key);
              setFormError('');
              setFormData({});
              setAmount('');
            }}
          >
            <img src={mode.icon} alt={mode.label} />
            <span className="pymttxt">{mode.label}</span>
          </div>
        ))}
      </div>

      {/* Content area can be extracted into renderContent() if needed */}
      <div className="pymntcnt actcont">
        <div className="frmdiv">
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {activeTab === 'credit' && (
          <>
            <div className="frmdiv">
              <label>Card Type:</label>
              <select id="cardType" onChange={handleChange}>
                <option value="">Select</option>
                <option>Debit Card</option>
                <option>Credit Card</option>
              </select>
            </div>
            <div className="frmdiv">
              <label>Card Number (last 4 digits):</label>
              <input
                type="text"
                id="cardNumber"
                maxLength={4}
                value={formData.cardNumber || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 4) handleChange({ target: { id: 'cardNumber', value: val } });
                }}
              />
            </div>
            <div className="frmdiv">
              <label>Bank Name:</label>
              <input type="text" id="bankName" onChange={handleChange} />
            </div>
            <div className="frmdiv">
              <label>Receipt Number:</label>
              <input type="text" id="receipt" onChange={handleChange} />
            </div>
            <div className="frmdiv">
              <label>Expiry:</label>
              <input type="date" id="expiry" onChange={handleChange} />
            </div>
          </>
        )}

        {activeTab === 'check' && (
          <>
            <div className="frmdiv">
              <label>Check Number:</label>
              <input type="text" id="checkNumber" onChange={handleChange} />
            </div>
            <div className="frmdiv">
              <label>Bank Name:</label>
              <input type="text" id="bankName" onChange={handleChange} />
            </div>
            <div className="frmdiv">
              <label>Check Date:</label>
              <input type="date" id="checkDate" onChange={handleChange} />
            </div>
          </>
        )}

        {activeTab === 'loyalty' && (
          <>
            <div className="frmdiv">
              <label>Loyalty Type:</label>
              <select id="loyaltyType" onChange={handleChange}>
                <option value="">Select</option>
                <option>Reward Points</option>
                <option>Membership</option>
              </select>
            </div>
            <div className="frmdiv">
              <label>Points:</label>
              <input type="text" id="points" onChange={handleChange} />
            </div>
          </>
        )}

        <div className="frmdiv">
          <label>Change:</label>
          <input type="text" readOnly value={change < 0 ? 0 : change.toFixed(2)} className="rdonly" />
        </div>

        {formError && <div className="error">{formError}</div>}
        <div className="frmdiv">
          <button className="pribtnblue" onClick={handleAddPayment}>Add Payment</button>
        </div>
      </div>
     </div>

      <div className="pymntlines">
        {payments.length > 0 && (
          <div className="payment-table">
            <h4 className="sectttl">Payment Summary</h4>
            <table className="pymntlintbl">
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
                    <td>
                      <button onClick={() => handleDelete(p.id)} className="removeln">
                        <img src="images/rmove.svg" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {payments.length > 0 && (
        <div className="frmdiv" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="submitbtn" onClick={handleSubmitPayments}>Finalize Payment</button>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default PaymentBlock;
