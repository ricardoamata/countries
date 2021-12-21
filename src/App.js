import { useEffect, useState } from 'react';
import CountryList from './CountryTable';
import Paginator from './Paginator';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

function App() {
	const [page, setPage] = useState(0);
	const [maxPage, setMaxPage] = useState(24);
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState(0);

	return (
		<div className="App">
			<NavBar setQuery={setQuery} setFilter={setFilter}></NavBar>
			<CountryList page={page} setMaxPage={setMaxPage} query={query} filter={filter}></CountryList>
			<Paginator page={page} setPage={setPage} maxPage={maxPage}></Paginator>
    	</div>
  	);
}

export default App;
