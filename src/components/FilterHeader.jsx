// src/components/FilterHeader.jsx
import React from "react";

const FilterHeader = () => {
  return (
    <header className="fltrhdr">
      <div className="fltroptflx">
        <div className="viewfilter">
          <span className="viewrm viewtb">Rooms</span>
          <span className="viewdoc viewtb active">Practitioners</span>
        </div>

        <div className="vwextrabtns">
          <div className="apptstatus">
            <div className="completed statcell">
              <div className="stimg">
               <img src={`${import.meta.env.BASE_URL}images/completed.svg`} alt="Completed" />

                Completed
              </div>
              <div className="statno">10</div>
            </div>

            <div className="pndpay statcell">
              <div className="stimg">
                <img src={`${import.meta.env.BASE_URL}images/paymentpend.svg`} alt="Payment Pending" />

                Payment Pending
              </div>
              <div className="statno">5</div>
            </div>

            <div className="ongngappt statcell">
              <div className="stimg">
               <img src={`${import.meta.env.BASE_URL}images/ongoing.png`} alt="Active/Ongoing" />

                Active/Ongoing
              </div>
              <div className="statno">5</div>
            </div>

            <div className="checkin statcell">
              <div className="stimg">
               <img src={`${import.meta.env.BASE_URL}images/checkin.svg`} alt="Checked In" />

                Checked In
              </div>
              <div className="statno">25</div>
            </div>

            <div className="confirmed statcell">
              <div className="stimg">
               <img src={`${import.meta.env.BASE_URL}images/confirmed.png`} alt="Confirmed" />

                Confirmed
              </div>
              <div className="statno">25</div>
            </div>

            <div className="booked statcell">
              <div className="stimg">
                <img src={`${import.meta.env.BASE_URL}images/booked.svg`} alt="Booked" />

                Booked
              </div>
              <div className="statno">40</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FilterHeader;
