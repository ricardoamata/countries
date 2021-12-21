import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import WikiAbstract from './WikiAbstract'
import LanguageModal from './LanguageModal';
import './Table.css';

function CountryList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [showWikiInfo, setShowWikiInfo] = useState(false);
    const [showLangInfo, setShowLangInfo] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(0);

    const handleCloseWikiInfo = () => setShowWikiInfo(false);

    const handleShowWikiInfo = (countryID) => {
        setShowWikiInfo(true);
        setSelectedCountry(countryID);
    }

    const handleCloseLangInfo = () => setShowLangInfo(false);

    const handleShowLangInfo = (countryID) => {
        setShowLangInfo(true);
        setSelectedCountry(countryID);
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
        countryList.sort((a, b) => {
            if(a.name.official < b.name.official) return -1;
            else if (a.name.official > b.name.official) return 1;
            return 0;
        });
        return (
            <>
                <WikiAbstract 
                    country={countryList[selectedCountry]} 
                    show={showWikiInfo} 
                    handleClose={handleCloseWikiInfo}>
                </WikiAbstract>
                <LanguageModal 
                    country={countryList[selectedCountry]}
                    show={showLangInfo}
                    handleClose={handleCloseLangInfo}>
                </LanguageModal>
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
                    {countryList.map((country, index) =>
                        <tr>
                            <td onClick={() => handleShowWikiInfo(index)}>{country.name.official}</td>
                            <td onClick={() => handleShowWikiInfo(index)}>{country.capital}</td>
                            <td onClick={() => handleShowWikiInfo(index)}>{country.region}</td>
                            <td>
                                <Button onClick={() => handleShowLangInfo(index)}>view</Button>
                            </td>
                            <td>{country.population.toLocaleString('en-US')}</td>
                            <td onClick={() => handleShowWikiInfo(index)}><img src={country.flags.png} width="65" /></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default CountryList;