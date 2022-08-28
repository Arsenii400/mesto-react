import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [avatar, setAvatar] = React.useState({ avatar: '' });
  const avatarRef = React.useRef();

  function handleAvatarChange(e) {
    setAvatar(e.target.value)
  }

  React.useEffect(() => {
    if (currentUser?.avatar) {
      setAvatar(currentUser?.avatar)
    }
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm
      name="updateAvatar"
      container="updateAvatar-container"
      heading="heading"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          ref={avatarRef}
          value={avatar}
          onChange={handleAvatarChange}
          className="popup__input popup__input_type_avatar"
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required />
        <span className="popup__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
