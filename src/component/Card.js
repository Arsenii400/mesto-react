import React from "react"

function Card(props) {

  function handleClick() {
    props.onCardClick(props.data);
  }

  return (
    <li className="element" key={`"${props.data._id}"`}>
      <button className="element__trash" type="button" aria-label="trash" />
      <img onClick={handleClick} src={props.data.link} alt={props.data.name} className="element__img" />
      <div className="element__wrapper">
        <h2 className="element__heading">{props.data.name}</h2>
        <div className="element__likeWrapper">
          <button className="element__like" type="button" aria-label="like" />
          <p className="element__likeCounter">{props.data.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
