import React from 'react';
// import avatar from '../images/avatar.jpg';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  );

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        // console.log(res);
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  );

  return (
    <main className="main">

      <section className="profile">

        <div className="profile__info">
          <div className="profile__parent-avatar">
            <img onClick={props.onEditAvatar} className="profile__avatar" src={userAvatar} alt="Жак Ив Кусто" />
          </div>
          <h1 className="profile__heading">{userName}</h1>
          <p className="profile__about">{userDescription}</p>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="edit"></button>
        </div>

        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="addButton"></button>

      </section>

      <section className="elements-wrapper">
        <ul className="elements">
          {cards.map((card) => (<Card data={card} onCardClick={props.onCardClick} />))}
        </ul>
      </section>
    </main>
  );

};

export default Main;
