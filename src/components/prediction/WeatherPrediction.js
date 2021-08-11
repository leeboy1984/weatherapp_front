import { useContext } from 'react';
import WeatherAppContext from '../WeatherAppContext';

import './WeatherPrediction.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


function WeatherPrediction(){

	const weatherContext = useContext(WeatherAppContext);

	function renderRow(row){
		let rowStr = "";

		for (var i = 0; i<row.length; i++)
			rowStr += "<td>" + row[i].value + "</td>";
		
		return rowStr;
	}

	return (
		<Container className="weatherPrediction">
		  <Row>
		    <Table responsive="sm">
			    <thead>
			      <tr>
			      	{(weatherContext.weatherPrediction && weatherContext.weatherPrediction.header  ? (
			      		weatherContext.weatherPrediction.header.map((header) => (
							<th><img src={"https://openweathermap.org/img/wn/" + header.icon + "@2x.png"} alt=""/><br/><span><i>{header.timestamp}</i></span></th>		
			      		))
			      	) : (
			      			<th>Waiting for city selection</th>
			      		)
			      	)}

			      </tr>
			    </thead>
			    <tbody>

			    	{(weatherContext.weatherPrediction && weatherContext.weatherPrediction.body  ? (

			      		weatherContext.weatherPrediction.body.map((row) => (
			      			<tr>{
			      				row.map((col) => (
			      					<td>{col.value}</td>
			      				))
			      			}</tr>
			      		))

			      	) : (
			      			<tr><td>Waiting for city selection</td></tr>
			      		)
			      	)}

			    </tbody>
			  </Table>
		  </Row>
		  
		</Container>
		);
};
export default WeatherPrediction;