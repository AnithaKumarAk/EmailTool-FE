import React from "react";
import "./overViewCard.css";

function OverViewCard({ icon, number, subtitle }) {
  return (
    <div>
      <div className='overview_card'>
        <div className='overview_card__icon'>
          <i className={icon}></i>
        </div>
        <div className='overview_card__info'>
          <div className='overview_card_wrap'>
            <h2 className='overview_card__title'>{number}</h2>
            <p className='overview_card__subtitle'>{subtitle}</p>
          </div>
          {/* <p className='card__number'>dff</p> */}
        </div>
      </div>
    </div>
  );
}

export default OverViewCard;
