import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Profile from '../Profile/Profile.js';
import { convertKelvinToCelsius, convertKelvinToFarenheit, defaultAPIInfo } from '../../utils/constants';
import ItemModal from '../ItemModal/ItemModal.js';
import { callWeatherAPI, parseResponse, parseWeatherCode } from '../../utils/WeatherAPI.js';
import { CurrentTempUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal.js'
import ItemCard from '../ItemCard/ItemCard.js';
import avatar from '../../images/avatar.png';
import { getItems, 
         handleApiError,
         addItem as addItemToDB, 
         deleteItem as deleteItemFromDB } from '../../utils/api.js';

export default function App() {
  const userName = `The "Zero Degree Longitude Club" President`;
  //const [userName, setUsername] = useState(`The "Zero Degree Longitude Club" President`); 
  //const [avatar, setAvatar] = useState('./url/to/image.bmp');
  const [isDay, setIsDay] = useState('true'); 
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [temperature, setTemperature] = useState({
    kelvin: 0,
    celsius: -273,
    farenheit: -460,
  });
  const [weather, setWeather] = useState('clear');
  const [location, setLocation] = useState('');
  const [isTempUnitC, setCurrentTempUnit] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [weatherData, setWeatherData] = useState({}); 

  function openGarmentForm() {
    setActiveModal('create');
  }

  function handleOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    closePopup()
  }

  function submitGarmentForm(item) {
    setIsLoading(true)
    addItem(item).then(() => {
      closePopup();
    }).catch(handleApiError).finally(() => {
      setIsLoading(false);
    }
    )
  }

  function openCardPopup(item){
    setSelectedCard(item)
    setActiveModal('preview');
  }

  function closePopup () {
    setActiveModal('');
    setSelectedCard({}); 
  }

  function handleTempUnitSwitch() {
    setCurrentTempUnit(!isTempUnitC);
  }

  function addItem(item){
    setIsLoading(true);
    return addItemToDB(item).then((response) => {
      setClothingItems([response, ...clothingItems]) 
    }).catch(handleApiError).finally(() => {
      setIsLoading(false);
    })                                           
  }

  function deleteItem(){
    setIsLoading(true)
    deleteItemFromDB(selectedCard._id).then(() => {
      setClothingItems(clothingItems.filter((item) => item._id !== selectedCard._id))
      closePopup();
    }).catch(handleApiError).finally(() => {
      setIsLoading(false);
    });
  }

  function createClothingCards(itemList, parentComponentName){
    return(
      <ul className={`${parentComponentName}__clothing-cards`}>
        {itemList.map(card => {
          return (
            <li key={card._id} className={`${parentComponentName}__clothing-card`}>
              <ItemCard card={card} onCardSelection={openCardPopup} />
            </li>)
        })}      
      </ul>
    )
  }
 
  useEffect(() => {
    getItems().then((response) => {
      setClothingItems(response)
    }).catch((response) => {
      console.error(`Error: ${response.status}`)
    })
  }, [])

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
      
    }).catch((response) => {
      console.error(`Error: ${response.status}`);
    })
  }, []);

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
    <CurrentTempUnitContext.Provider value ={{
      isTempUnitC: isTempUnitC, 
      handleTempUnitSwitch
    }}>
      <div className='page'>
        <Header 
          locationName={location} 
          userName={userName} 
          avatar={avatar} 
          openGarmentForm={openGarmentForm} 
        />
        <Switch>
          <Route path='/profile'>
            <Profile
              createClothingCards={createClothingCards}
              openNewGarmentForm={openGarmentForm}
              clothingItems={clothingItems}
              avatar={avatar}
              userName={userName}
            />
          </Route>
          <Route path='/'>
            <Main clothingItems={clothingItems}
              temperature={temperature}
              time={isDay ? 'day' : 'night'}
              weather={weather}
              createCards={createClothingCards}
            />
          </Route>
        </Switch>

        <Footer />
        {activeModal === 'create' && 
          <AddItemModal
            onOverlayClick={handleOverlay}
            onClose={closePopup}
            onSubmit={submitGarmentForm}
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
      </div>
    </CurrentTempUnitContext.Provider>
  );
}