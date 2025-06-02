import React from 'react';

const InvoiceTable = ({
  items,
  onPriceChange,
  onDiscountChange,
  onDiscountPercentChange,
  onRemove,
  showDiscountPercent = false,
  readOnlyInputs = false, // new prop
}) => {
  return (
    <div className="invtable">
      <table id="invctable">
        <thead>
          <tr>
            <th>No.</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            {showDiscountPercent && <th>Discount %</th>}
            <th>Amount without VAT</th>
            <th>VAT</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={showDiscountPercent ? 10 : 9}>
                <div className="emptytable">
                  <p className="nodata">No invoice items added yet.</p>
                </div>
              </td>
            </tr>
          ) : (
            items.map((item, idx) => {
              const price = parseFloat(item.price) || 0;
              const discount = parseFloat(item.discount) || 0;
              const discountPercent = price ? ((discount / price) * 100) : '';
              const total = price - discount;
              const vat = total * 0.15;
              const finalTotal = total + vat;

              return (
                <tr key={idx}>
                  <td className="invno">{idx + 1}</td>
                  <td>{item.name}</td>
                  <td className="qtyno">1</td>
                  <td className="prcval">
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => onPriceChange?.(idx, e.target.value)}
                      readOnly={readOnlyInputs}
                    />
                  </td>
                  <td className="discno">
                    <input
                      type="text"
                      value={item.discount}
                      onChange={(e) => onDiscountChange?.(idx, e.target.value)}
                      readOnly={readOnlyInputs}
                    />
                  </td>
                  {showDiscountPercent && (
                    <td className="discno">
                      <input
                        type="text"
                        value={discountPercent}
                        onChange={(e) =>
                          onDiscountPercentChange?.(idx, e.target.value)
                        }
                      />
                    </td>
                  )}
                  <td className="discno">{total.toFixed(2)}</td>
                  <td className="discno">{vat.toFixed(2)}</td>
                  <td className="discno">{finalTotal.toFixed(2)}</td>
                  <td className="actbtncell">
                    <button
                      className="delbtn tooltip"
                      data-tooltip="Delete"
                      data-tooltip-pos="left"
                      onClick={() => onRemove?.(idx)}
                    >
                      <img src="images/rmove.svg" alt="Delete" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
