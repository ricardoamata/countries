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

        var queryResults = countryList;
        console.log(props.query);
        if(props.query !== "") {
            var column;
            queryResults = countryList.filter((item) => {
                /*switch(props.filter) {
                    case 0:
                        if(item.name.official.toLowerCase().includes(props.query.toLowerCase()) ||
                        item.name.common.toLowerCase().includes(props.query.toLowerCase()) )
                            return item;
                        break;
                    case 1:
                        if(item.capital != null)
                            column = item.name.official;
                        else return(<p>No data to display</p>);
                        break;
                    case 2:
                        column = item.capital;
                        break;
                    case 3:
                        column = item.region;
                        break;
                } */
                
                if(item.name.official.toLowerCase().includes(props.query.toLowerCase()))
                    return item;
            });
        }

        if(queryResults.length === 0) {
            return (
                <p>No data to display</p>
            )
        }

        // El paginator esta implementado manualmente
        // debido a fallas con el codigo Ligne Paginatejs,
        // que creo que son por que no es compatible con react

        var paginator = [];
        var i;
        for(i = 0; i < queryResults.length/10; i++) {
            paginator.push([]);
            for(var j = 0; j < 10; j++) {
                if(10*i+j >= queryResults.length)
                    break;
                paginator[i].push(queryResults[10*i+j]);
            }
        }

        props.setMaxPage(i);

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
                <Table striped bordered hover size="sm" className="w-75 mx-auto mt-5">
                    <thead>
                        <tr>
                            <th>Official name</th>
                            <th>Capital</th>
                            <th>Region</th>
                            <th>Language</th>
                            <th>Population</th>
                            <th>Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                    {paginator[props.page].map((country, index) =>
                        <tr>
                            <td onClick={() => handleShowWikiInfo(props.page*10+index)}>{country.name.official}</td>
                            <td onClick={() => handleShowWikiInfo(props.page*10+index)}>{country.capital}</td>
                            <td onClick={() => handleShowWikiInfo(props.page*10+index)}>{country.region}</td>
                            <td>
                                <Button onClick={() => handleShowLangInfo(props.page*10+index)}>view</Button>
                            </td>
                            <td>{country.population.toLocaleString('en-US')}</td>
                            <td onClick={() => handleShowWikiInfo(props.page*10+index)}><img src={country.flags.png} height="40" /></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default CountryList;