import { useEffect, useState } from 'react';

function CountryList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [countryList, setCountryList] = useState([]);

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
            <table>
                <tr>
                    <th>Official name</th>
                    <th>Capital</th>
                    <th>Region</th>
                    <th>Population</th>
                </tr>
                {countryList.map(country =>
                    <tr>
                        <td>{country.name.official}</td>
                        <td>{country.capital}</td>
                        <td>{country.region}</td>
                        <td>{country.population}</td>
                    </tr>
                )}
            </table>
        );
    }
}

export default CountryList;