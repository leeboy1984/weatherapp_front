import { useContext } from 'react';
import WeatherAppContext from '../WeatherAppContext';

import './LocationSelector.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

import { getCitiesByCountry } from '../../services/getCities';
import { getCurrentWeather } from '../../services/getWeather';
import { getWeatherPrediction } from '../../services/getWeather';

function LocationSelector(){

	//const [countryCode, setCountryCode] = useState('');
	//const [cityCode, setCityCode] = useState('es-mad');
	const weatherContext = useContext(WeatherAppContext);
	
	const countryChangeHandler = (event) => {
		weatherContext.setCityCountry(event.target.value);
	  	getCitiesByCountry(event.target.value).then( (citiesList) => {
	  		console.log(citiesList)
	      weatherContext.setCities(citiesList)
	    });
	}

	const cityChangeHandler = (event) => {
		weatherContext.setCityCode(event.target.value);
		weatherContext.setCityName(event.target.options[event.target.options.selectedIndex].innerHTML);

		getCurrentWeather(event.target.value).then( (currentWeather) => {
	      weatherContext.setCurrentWeather(currentWeather)
	    });

	    getWeatherPrediction(event.target.value).then( (weatherPrediction) => {
	      weatherContext.setWeatherPrediction(weatherPrediction)
	    });
	}

	return (
		<Container className="align-items-center locationSelector">
			<Row>
				<Col>
					<FloatingLabel controlId="countrySelect" label="Country" column="lg">
					  <Form.Select aria-label="Floating label select " value={weatherContext.cityCountry} className="mb-3" onChange={countryChangeHandler}>
					  {!weatherContext.countries || weatherContext.countries.length === 0 ? ( 
					    <option>Fetching Countries</option>
					    ) : (
					    	weatherContext.countries.map((country) => (
					    		<option key={country.countryCode} value={country.countryCode}>{country.countryName}</option>	
					    )
					    ))}
					  </Form.Select>
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col>
					<FloatingLabel controlId="citySelect" label="City" column="lg">
					  <Form.Select aria-label="Floating label select " value={weatherContext.cityCode} className="mb-3" onChange={cityChangeHandler}>
					    {!weatherContext.cities || weatherContext.cities.length === 0 ? ( 
					    <option>Select city after country</option>
					    ) : (
					    	weatherContext.cities.map((city) => (
					    		<option key={city.cityCode} value={city.cityCode}>{city.cityName}</option>	
					    )
					    ))}
					  </Form.Select>
					</FloatingLabel>
				</Col>
			</Row>
		</Container>

		);
};

export default LocationSelector;