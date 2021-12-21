import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'

import './Table.css';

function CountryList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [countryList, setCountryList] = useState([]);

    let get_lang_list = (lang_map) => {
        var langs = []
        for(var key in lang_map) {
            langs.push(lang_map[key]);
        }
        return langs
    }

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setCountryList(result);
                },
                (error) => {
                    setIsloaded(true);
                    setError(error);
                }
            )
    }, []);

    if(error) {
        return <div>Error: {error.message}</div>
    }
    else if(!isLoaded) {
        return <div>Loading...</div>;
    }
    else if(countryList.length === 0) {
        return(
            <div>No elements found</div>
        );
    }
    else  {
        return (
            <Table striped bordered hover size="sm" className="w-50 mx-auto mt-5">
                <thead>
                    <th>Official name</th>
                    <th>Capital</th>
                    <th>Region</th>
                    <th>Language</th>
                    <th>Population</th>
                    <th>Flag</th>
                </thead>
                <tbody>
                {countryList.map(country => 
                    <tr>
                        <td>{country.name.official}</td>
                        <td>{country.capital}</td>
                        <td>{country.region}</td>
                        <td>
                            <ul>
                                {get_lang_list(country.languages).map((lang, index) => 
                                    <li className="no-bullets" key={index}>{lang}</li>
                                )}
                            </ul>
                        </td>
                        <td>{country.population}</td>
                        <td><img src={country.flags.png} width="65" /></td>
                    </tr>
                )}
                </tbody>
            </Table>
        );
    }
}

export default CountryList;