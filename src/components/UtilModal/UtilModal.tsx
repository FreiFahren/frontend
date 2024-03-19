import { Link } from 'react-router-dom';

import './UtilModal.css';

interface UtilModalProps {
    className: string
}

const UtilModal: React.FC<UtilModalProps> = ({ className }) => {
    return (
        <div className={`util-modal container ${className}`}>
            <h1>Info</h1>
            <button>
                <a href='https://docs.google.com/forms/d/e/1FAIpQLSdWK_9ziq8cGEWFwzc_qpTaOI1dfxTz8vHWvuDphdz-UvX1TQ/viewform?usp=sf_link' target='_blank' rel='noopener noreferrer'>
                    💡 Gib uns Feedback!
                </a>
            </button>
            <ul>
                <li><Link to='/impressum'>Impressum</Link></li>
                <li><Link to='/Datenschutz'>Datenschutz</Link></li>
            </ul>
        </div>
    );
}

export default UtilModal;