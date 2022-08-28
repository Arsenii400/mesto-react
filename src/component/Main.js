import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
// import avatar from '../images/avatar.jpg';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  );

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((oldcard) =>
          oldcard._id !== card._id
        ))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <main className="main">

      <section className="profile">

        <div className="profile__info">
          <div className="profile__parent-avatar">
            <img onClick={props.onEditAvatar} className="profile__avatar" src={currentUser?.avatar} alt="Жак Ив Кусто" />
          </div>
          <h1 className="profile__heading">{currentUser?.name}</h1>
          <p className="profile__about">{currentUser?.about}</p>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="edit"></button>
        </div>

        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="addButton"></button>

      </section>

      <section className="elements-wrapper">
        <ul className="elements">
          {cards.map((card) => (<Card onCardDelete={handleCardDelete} onCardLike={handleCardLike} data={card} onCardClick={props.onCardClick} />))}
        </ul>
      </section>
    </main>
  );

};

export default Main;
