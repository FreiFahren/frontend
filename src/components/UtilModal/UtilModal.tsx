import { Link } from 'react-router-dom';

import './UtilModal.css';

const UtilModal = () => {
    return (
        <div className='util-modal'>
            <h1>Info</h1>
            <button>Gib uns Feedback!</button>
            <ul>
                <li><Link to='/impressum'>Impressum</Link></li>
                <li><Link to='/Datenschutz'>Datenschutz</Link></li>
            </ul>
        </div>
    );
}

export default UtilModal;