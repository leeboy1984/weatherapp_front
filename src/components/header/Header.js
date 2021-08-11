import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Header(){
	return (
		<Container fluid>
			<Row>
				<Col>
					<header className="App-header">
				   		<div>
				     		<h2>Weather App</h2>
				    	</div>
				  	</header>
				</Col>
			</Row>
		</Container>
		
		);
};

export default Header;