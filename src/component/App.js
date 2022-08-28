// import './App.css';
import '../index.css';
import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';

function App() {

  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, card: {} });

  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    api.getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  );

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false, card: {} })
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, card: card });
  }

  function handleUpdateUser() {
    api.patchProfileEdit()
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick} />

        <Footer />

        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

        <PopupWithForm
          name="add"
          container="container"
          heading="heading"
          title="Новое место"
          buttonTitle="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <label className="popup__field">
            <input className="popup__input popup__input_type_place" id="name-input" type="text" name="place"
              minLength="2"
              maxLength="30" placeholder="Название" required />
            <span className="popup__input-error name-input-error"></span>
          </label>
          <label className="popup__field">
            <input className="popup__input popup__input_type_link" id="link-input" type="url" name="link"
              placeholder="Ссылка на картинку" required />
            <span className="popup__input-error link-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="updateAvatar"
          container="updateAvatar-container"
          heading="heading"
          title="Обновить аватар"
          buttonTitle="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <label className="popup__field">
            <input className="popup__input popup__input_type_avatar" id="avatar-input" type="url" name="avatar"
              placeholder="Ссылка на аватар" required />
            <span className="popup__input-error avatar-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="deleteConfirmation"
          container="dltConfirm-container"
          heading="dltConfirm-heading"
          title="Вы уверены?" buttonTitle="Да" />

        <ImagePopup
          isOpen={selectedCard.isOpen}
          card={selectedCard}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
