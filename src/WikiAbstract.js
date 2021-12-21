import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function WikiAbsctract(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [countryAbstract, setCountryAbstract] = useState("");

    var countryName = props.country.name.official;

    useEffect(() => {
        setIsloaded(false);
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setCountryAbstract(result.extract);
                },
                (error) => {
                    setIsloaded(true);
                    setError(error);
                }
            );
    }, [props.country]);

    if(error) {
        return <div>Error: {error.message}</div>
    }
    else {
        return (
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>{countryName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{isLoaded ? countryAbstract : "Loading..."}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>
        )
    }
}

export default WikiAbsctract;