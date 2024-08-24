import React from "react";
import "./groupcard.css";

function GroupCard({ name, emails, handleDelete, id }) {
  return (
    <div>
      <div className='card'>
        <div className='card__icon'>
          <i className='fa-solid fa-envelope'></i>
        </div>
        <div className='card__info'>
          <h2 className='card__title'>{name}</h2>
          <p className='card__subtitle'>Number of Emails</p>
          <p className='card__number'>{emails}</p>
        </div>
        <button className='card__delete-btn' onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default GroupCard;
