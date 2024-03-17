import './LegalDisclaimer.css';

interface LegalDisclaimerProps {    
    closeModal: () => void;
}

const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ closeModal }) => {
  return (
    <div className='legal-disclaimer'>
      <h1>Legal Disclaimer</h1>
      <p>
        This is a fictional website created for the purpose of a coding challenge. Any resemblance to real persons, living or dead, is purely coincidental.
      </p>
    <button onClick={closeModal}>I understand</button>
    </div>
  );
}

export default LegalDisclaimer;