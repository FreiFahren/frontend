import { Link } from 'react-router-dom';

import './UtilModal.css';
import githubMark from '../../icons/github-mark.svg';

interface UtilModalProps {
    className: string
}

const UtilModal: React.FC<UtilModalProps> = ({ className }) => {
    return (
        <div id={'util-modal-block'} className={`util-modal container ${className}`}>
            <h1>Info</h1>
            <button>
                <a href='https://docs.google.com/forms/d/e/1FAIpQLSdWK_9ziq8cGEWFwzc_qpTaOI1dfxTz8vHWvuDphdz-UvX1TQ/viewform?usp=sf_link' target='_blank' rel='noopener noreferrer'>
                    💡 Gib uns Feedback!
                </a>
            </button>

            <div>
            <ul>
                <span>
                    <a href='https://github.com/FreiFahren/frontend' target='_blank' rel='noopener noreferrer'>
                        <img src={githubMark} alt='GitHub' />
                    </a>
                </span>
                <li><Link to='/impressum'>Impressum</Link></li>
                <li><Link to='/Datenschutz'>Datenschutz</Link></li>
            </ul>
            </div>
        </div>
    );
}

export default UtilModal;