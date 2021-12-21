import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function LanguageModal(props) {
    var countryName = props.country.name.official;

    let get_lang_list = (lang_map) => {
        var langs = []
        for(var key in lang_map) {
            langs.push(lang_map[key]);
        }
        return langs;
    }

    return (
        <Modal centered show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>{"Languages of "+countryName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {get_lang_list(props.country.languages).map((lang, index) =>
                        <li key={index}>{lang}</li>
                    )}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LanguageModal;