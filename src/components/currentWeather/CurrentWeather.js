import { useContext } from 'react';
import WeatherAppContext from '../WeatherAppContext';

import './CurrentWeather.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function CurrentWeather(props){

	const weatherContext = useContext(WeatherAppContext);

	return (
		<Container>
			<Row >
				<Col>
					<div className="weatherIcon">
						<img src={(weatherContext.currentWeather.weather ? "https://openweathermap.org/img/wn/" + weatherContext.currentWeather.weather[0].icon + "@4x.png" : "https://img.icons8.com/ios/100/000000/address--v1.png")} alt=""/>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<h3>{(weatherContext.cityName ? weatherContext.cityName : "City" )}</h3>
					<h5>{(weatherContext.cityCode ? weatherContext.cityCode.substring(0,2).toUpperCase() : "COUNTRY" )}</h5>
				</Col>
				<Col>
					<h3>{(weatherContext.currentWeather.main ? Math.round(weatherContext.currentWeather.main.temp) + "º" : "º" )}</h3>
					<h5>{(weatherContext.currentWeather.weather ? weatherContext.currentWeather.weather[0].main : "..." )}</h5>
					<h6 style={{textTransform: 'capitalize'}}><i>{(weatherContext.currentWeather.weather ? weatherContext.currentWeather.weather[0].description : "..." )}</i></h6>
				</Col>
			</Row>
		</Container>
		
		);
};

export default CurrentWeather;