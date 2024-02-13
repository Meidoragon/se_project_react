import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Profile from '../Profile/Profile.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { convertKelvinToCelsius, convertKelvinToFarenheit, defaultAPIInfo } from '../../utils/constants';
import ItemModal from '../ItemModal/ItemModal.js';
import { callWeatherAPI, parseResponse, parseWeatherCode } from '../../utils/WeatherAPI.js';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddItemModal from '../AddItemModal/AddItemModal.js'
import ItemCard from '../ItemCard/ItemCard.js';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import {
  getItems,
  handleApiError,
  addItem as addItemToDB,
  deleteItem as deleteItemFromDB,
  getCurrentUser,
  updateCurrentUser,
  addCardLike,
  removeCardLike,
} from '../../utils/api.js';
import {
  signIn as makeSignInRequest,
  register,
} from '../../utils/auth.js';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [user, setUser] = useState({});
  const [isDay, setIsDay] = useState(true);
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = useState({});
  const [temperature, setTemperature] = useState({
    kelvin: 0,
    celsius: -273,
    farenheit: -460,
  });
  const [weather, setWeather] = useState('clear');
  const [location, setLocation] = useState('');
  // const [isTempUnitC, setCurrentTempUnit] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('celsius')
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function openGarmentForm() {
    setActiveModal('create');
  }

  function handleOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    closePopup()
  }

  function setUserInfoFromToken(token) {
    getCurrentUser(token)
      .then((res) => {
        setUser(res.data);
        setUserToken(token);
        setIsLoggedIn(true);
      })
      .catch(handleApiError);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.setItem('jwt', '');
    setUserToken('');
    setUser({});
  }

  function signIn(loginInfo) {
    makeSignInRequest(loginInfo)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserInfoFromToken(res.token);
      })
      .catch((err) => {
        handleApiError(err);
      })
  }

  function handleRegistrationFormSubmit(values) {
    setIsLoading(true);
    register(values)
      .then((res) => {
        const loginInfo = {
          email: values.email,
          password: values.password,
        }
        signIn(loginInfo)
      })
      .catch(handleApiError)
      .finally(() => {
        closePopup();
        setIsLoading(false);
      })
  }

  function handleSignInFormSubmit(values) {
    setIsLoading(true);
    signIn(values);
    closePopup();
    setIsLoading(false);
  }

  function handleProfileUpdate(values) {
    setIsLoading(true);
    // allow for partial profile changes
    const profileInfo = {};
    for (const key of Object.keys(values)) {
      if (values[key]) {
        profileInfo[key] = values[key];
      }
    }
    updateCurrentUser(userToken, profileInfo)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        handleApiError(err);
      })
    closePopup();
    setIsLoading(false);
  }

  function toggleLikeStatus(card, isLiked) {
    isLiked ?
      removeCardLike(userToken, card._id)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          handleApiError(err);
        }) :
      addCardLike(userToken, card._id)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          handleApiError(err);
        })
  }

  function openCardPopup(item) {
    setSelectedCard(item)
    setActiveModal('preview');
  }

  function closePopup() {
    setActiveModal('');
    setSelectedCard({});
  }

  // function handleTempUnitSwitch() {
  //   setCurrentTempUnit(!isTempUnitC);
  // }
  function handleToggleSwitchChange() {
    if (currentTemperatureUnit === 'celsius') {
      setCurrentTemperatureUnit('farenheit')
    } else {
      setCurrentTemperatureUnit('celsius')
    }
  }

  function addItem(item) {
    setIsLoading(true);
    return addItemToDB(userToken, item).then((response) => {
      closePopup();
      setClothingItems([response.data, ...clothingItems]);
    }).catch(handleApiError).finally(() => {
      setIsLoading(false);
    })
  }

  function openLogInForm() {
    setActiveModal('login');
  }

  function openSignUpForm() {
    setActiveModal('register');
  }

  function openProfileForm() {
    setActiveModal('update-profile');
  }

  function deleteItem() {
    setIsLoading(true)
    deleteItemFromDB(userToken, selectedCard._id).then(() => {
      setClothingItems(clothingItems.filter((item) => item._id !== selectedCard._id))
      closePopup();
    }).catch(handleApiError).finally(() => {
      setIsLoading(false);
    });
  }

  // function createClothingCards(itemList, parentComponentName) {
  //   return (
  //     <ul className={`${parentComponentName}__clothing-cards`}>
  //       {itemList.map(card => {
  //         return (
  //           <li key={card._id} className={`${parentComponentName}__clothing-card`}>
  //             <ItemCard card={card} onCardSelection={openCardPopup} toggleLikeStatus={toggleLikeStatus} />
  //           </li>)
  //       })}
  //     </ul>
  //   )
  // }

  // get clothing items 
  useEffect(() => {
    getItems().then((response) => {
      setClothingItems(response)
    }).catch((err) => {
      handleApiError(err)
    })
  }, [])

  // get weather infomation
  useEffect(() => {
    callWeatherAPI(defaultAPIInfo).then((item) => {
      return parseResponse(item);
    }).then((data) => {
      const kelvin = data.temperature;
      setTemperature({
        kelvin: kelvin,
        farenheit: convertKelvinToFarenheit(kelvin),
        celsius: convertKelvinToCelsius(kelvin),
      });
      setWeather(parseWeatherCode(data.weatherCode));
      setLocation(data.location)
      setIsDay(data.dateTime >= data.sunrise && data.dateTime <= data.sunset ? true : false)

    }).catch((err) => {
      handleApiError(err);
    })
  }, []);

  // get user information for logged in user
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setUserInfoFromToken(token);
    }
  }, [])

  // listen for key inputs and close modal when key is 'esc'
  useEffect(() => {
    if (!activeModal) return;
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopup()
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [activeModal])

  return (
    <CurrentUserContext.Provider value={{
      isLoggedIn: isLoggedIn,
      user: user,
      userToken: userToken,
    }}>
      <CurrentTemperatureUnitContext.Provider value={{
        currentTemperatureUnit,
        handleToggleSwitchChange
        // isTempUnitC: isTempUnitC,
        // handleTempUnitSwitch
      }}>
        <div className='page'>
          <Header
            locationName={location}
            openGarmentForm={openGarmentForm}
            authFunctions={{ openSignUpForm, openLogInForm }}
          />
          <Switch>
            <ProtectedRoute path='/profile' loggedIn={isLoggedIn}>
              <Profile
                // createClothingCards={createClothingCards}
                openNewGarmentForm={openGarmentForm}
                openProfileForm={openProfileForm}
                handleLogout={handleLogout}
                clothingItems={clothingItems}
                openCardPopup={openCardPopup}
                toggleLikeStatus={toggleLikeStatus}
              />
            </ProtectedRoute>
            <Route path='/'>
              <Main
                clothingItems={clothingItems}
                temperature={temperature}
                time={isDay ? 'day' : 'night'}
                weather={weather}
                openCardPopup={openCardPopup}
                toggleLikeStatus={toggleLikeStatus}
              // createCards={createClothingCards}
              />
            </Route>
          </Switch>

          <Footer />
          {activeModal === 'create' &&
            <AddItemModal
              onOverlayClick={handleOverlay}
              onClose={closePopup}
              onSubmit={addItem}
              isLoading={isLoading}
            />
          }
          {activeModal === 'preview' &&
            <ItemModal
              item={selectedCard}
              onClose={closePopup}
              onDelete={deleteItem}
              onOverlayClick={handleOverlay}
              isLoading={isLoading}
            />
          }
          {activeModal === 'register' &&
            <RegisterModal
              onClose={closePopup}
              onOverlayClick={handleOverlay}
              onSubmit={handleRegistrationFormSubmit}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
            />
          }
          {activeModal === 'login' &&
            <LoginModal
              onClose={closePopup}
              onOverlayClick={handleOverlay}
              onSubmit={handleSignInFormSubmit}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
            />
          }
          {activeModal === 'update-profile' &&
            <EditProfileModal
              onClose={closePopup}
              onOverlayClick={handleOverlay}
              onSubmit={handleProfileUpdate}
              isLoading={isLoading}
            />
          }
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
