import React, { useState, useEffect } from 'react';
import './App.css';

import './custom.scss';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import WeatherAppContext from './components/WeatherAppContext';
import Header from './components/header/Header';
import LocationSelector from './components/locationSelector/LocationSelector';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import WeatherPrediction from './components/prediction/WeatherPrediction';
import Favorites from './components/favorites/Favorites';

import { getCountries } from './services/getCountries';

function App() {

  // State
  const [cityCountry, setCityCountry] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [cityName, setCityName] = useState('');
  let tmpFavs = [];
  if (localStorage.getItem('favCities'))
    tmpFavs = JSON.parse(localStorage.getItem('favCities'));
  const [favs, setFavs] = useState(tmpFavs);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherPrediction, setWeatherPrediction] = useState({});

  const globalSetting = {
    cityCountry: cityCountry,
    cityCode: cityCode,
    cityName: cityName,
    favs: favs,
    countries,
    cities,
    currentWeather,
    weatherPrediction,
    setCityCountry,
    setCityCode,
    setCityName,
    setFavs,
    setCountries,
    setCities,
    setCurrentWeather,
    setWeatherPrediction
  }

const addFavPlaceHandler = (event) => {
  event.preventDefault();
  const tmpFavCity = {
    cityName,
    cityCode,
    cityCountry
  }

  setFavs((prevState) => { return [...prevState, tmpFavCity]})

  let favis = [];
  if (localStorage.getItem('favCities')){
    favis = JSON.parse(localStorage.getItem('favCities'));
  }
  favis.push(tmpFavCity);
  localStorage.setItem('favCities', JSON.stringify(favis));
}
  

  useEffect(() => {
    getCountries().then( (countriesList) => {
      setCountries(countriesList)
    });
  }, []);

  return (
    <WeatherAppContext.Provider value={globalSetting}>
      <Container fluid className="App">
          <Header/>
          <LocationSelector/>
          <Button variant="success" onClick={addFavPlaceHandler}>Fav place</Button>
          <CurrentWeather cityName="Madrid" cityCountry="ES" currentTemp="23.8º" currentSky="Cloudy" weatherIcon="01d"></CurrentWeather>
          <WeatherPrediction/>
          <Favorites/>
          
      </Container>  
      </WeatherAppContext.Provider>
  );
}

export default App;
