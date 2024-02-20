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
import { callWeatherAPI, parseWeatherCode } from '../../utils/WeatherAPI.js';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddItemModal from '../AddItemModal/AddItemModal.js'
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
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [temperature, setTemperature] = useState({
    kelvin: 0,
    celsius: -273,
    farenheit: -460,
  });
  const [weather, setWeather] = useState('clear');
  const [location, setLocation] = useState('');
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
    return getCurrentUser(token)
      .then((res) => {
        setUser(res.data);
        setUserToken(token);
        setIsLoggedIn(true);
      })
    // errors handled by calling functions
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.setItem('jwt', '');
    setUserToken('');
    setUser({});
  }

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then((response) => {
        closePopup();
        return response;
      })
      .catch((err) => {
        handleApiError(err);
      })
      .finally(() => setIsLoading(false))
  }

  function signIn(loginInfo) {
    return makeSignInRequest(loginInfo)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        return res.token;
      })
      .then(setUserInfoFromToken)
      .catch(handleApiError);
  }

  function handleRegistrationFormSubmit(values) {
    const makeRequest = () => {
      return register(values)
        .then(() => {
          const loginInfo = {
            email: values.email,
            password: values.password,
          }
          return signIn(loginInfo);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleSignInFormSubmit(loginInfo) {
    const makeRequest = () => {
      return signIn(loginInfo)
    }
    handleSubmit(makeRequest);
  }

  function handleProfileUpdate(values) {
    const profileInfo = {};
    for (const key of Object.keys(values)) {
      if (values[key]) {
        profileInfo[key] = values[key];
      }
    }
    const makeRequest = () => {
      return updateCurrentUser(userToken, profileInfo)
        .then((res) => setUser(res.data))
    }
    handleSubmit(makeRequest);
  }

  function toggleLikeStatus(card, isLiked) {
    const makeRequest = isLiked ?
      removeCardLike :
      addCardLike;
    return makeRequest(userToken, card._id)
      .then((updatedCard) => {
        setClothingItems([...clothingItems.filter((v) => v._id !== updatedCard._id, updatedCard)])
        setClothingItems(clothingItems.map((c) => {
          return c._id === updatedCard._id ? updatedCard : c;
        }))
        return updatedCard
      })
      .catch((err) => {
        handleApiError(err);
        // Return original card back to calling function
        return card;
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

  function handleToggleSwitchChange() {
    if (currentTemperatureUnit === 'celsius') {
      setCurrentTemperatureUnit('farenheit')
    } else {
      setCurrentTemperatureUnit('celsius')
    }
  }

  function addItem(item) {
    const makeRequest = () => {
      return addItemToDB(userToken, item)
        .then((response) => {
          setClothingItems([response.data, ...clothingItems]);
        })
    }
    handleSubmit(makeRequest);
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
    const makeRequest = () => {
      return deleteItemFromDB(userToken, selectedCard._id)
        .then(() => {
          setClothingItems(clothingItems.filter((item) => item._id !== selectedCard._id))
        })
    }
    handleSubmit(makeRequest);
  }

  // get clothing items 
  useEffect(() => {
    getItems()
      .then((res) => {
        setClothingItems(res)
      })
      .catch(handleApiError)
  }, [])

  // get weather infomation
  useEffect(() => {
    callWeatherAPI(defaultAPIInfo)
      .then((data) => {
        const kelvin = data.temperature;
        setTemperature({
          kelvin,
          farenheit: convertKelvinToFarenheit(kelvin),
          celsius: convertKelvinToCelsius(kelvin),
        });
        setWeather(parseWeatherCode(data.weatherCode));
        setLocation(data.location);
        setIsDay(data.dateTime >= data.sunrise && data.dateTime <= data.sunset ? true : false)
      })
      .catch(handleApiError);
  }, []);

  // get user information for logged in user
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setUserInfoFromToken(token)
        .catch((err) => {
          if (err.status === 401) {
            console.log('expired token')
            handleLogout();
          } else {
            handleApiError(err);
          }
        });
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
