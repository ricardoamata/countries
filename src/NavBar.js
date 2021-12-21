import {Navbar, Container, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'

function NavBar(props) {

	const makeSearch = (e) => {
		if(e.target.value.length > 2){
			props.setQuery(e.target.value);
		}
		else {
			props.setQuery("");
		}
	}

	const changeColumn = (e) => {
		props.setFilter(parseInt(e.target.value));
	}

	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand href="#">Countries</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
				<Nav
					className="me-auto my-2 my-lg-0"
					style={{ maxHeight: '100px' }}
					navbarScroll
				>
				</Nav>
				<Form className="d-flex">
				<Form.Select onChange={changeColumn} aria-label="Default select example">
					<option value="1">Official name</option>
					<option value="0" disabled>Any column</option>
					<option value="2" disabled>Capital</option>
					<option value="3" disabled>Region</option>
				</Form.Select>
					<FormControl
					onChange={makeSearch}
					type="search"
					placeholder="Search"
					className="me-2"
					aria-label="Search"
					/>
				</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default NavBar;