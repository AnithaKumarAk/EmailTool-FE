import React from "react";

function TemplateCard({ name, handleDelete, id }) {
  return (
    <div>
      <div className='card'>
        <div className='card__icon'>
          <i className='fa-solid fa-envelope'></i>
        </div>
        <div className='card__info'>
          <h2 className='card__title'>{name}</h2>
        </div>
        <button className='card__delete-btn' onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TemplateCard;