import { useContext } from 'react';

import './Favorites.css';

import WeatherAppContext from '../WeatherAppContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { getCurrentWeather } from '../../services/getWeather';
import { getWeatherPrediction } from '../../services/getWeather';


function Favorites(props){

	const weatherContext = useContext(WeatherAppContext);

	const favoriteWeatherHandler = (event) => {	
		let clickedCity = event.target;

		//weatherContext.setCityCountry(clickedCity.value.substring(0,2));
		weatherContext.setCityCode(clickedCity.value);
		weatherContext.setCityName(clickedCity.dataset.cityName);

		getCurrentWeather(event.target.value).then( (currentWeather) => {
	      weatherContext.setCurrentWeather(currentWeather)
	    });

	    getWeatherPrediction(event.target.value).then( (weatherPrediction) => {
	      weatherContext.setWeatherPrediction(weatherPrediction)
	    });
	}

	const removeFavoriteWeatherHandler = (event) => {

		let clickedCity = event.target.value;

		let newFavs = weatherContext.favs.filter(function (value, index, arr){
			return value.cityCode != clickedCity;
		});

		weatherContext.setFavs(newFavs);
		localStorage.setItem('favCities', JSON.stringify(newFavs));
	}

	return (
		<Container className="favoritesList" >
			<Row column="lg">
				<h3>Favorites</h3>
			</Row>
			<Row column="xxl">
				<ListGroup variant="flush">
					{weatherContext.favs.length === 0 ? ( 
						<p>Once you add Favorite Cities you will see a list</p>
						) : ( 
							weatherContext.favs.map((city) => (
						<ListGroup.Item key={city.cityCode}>{city.cityName} - {city.cityCountry.toUpperCase()} <Button variant="outline-danger" value={city.cityCode} onClick={removeFavoriteWeatherHandler}>Remove</Button>  <Button variant="info" value={city.cityCode} onClick={favoriteWeatherHandler} data-city-name={city.cityName}>See Weather</Button></ListGroup.Item>
						)
					))}
				</ListGroup>
			</Row>
		</Container>	

		);
};

export default Favorites;