import React from 'react';

import './LegalDisclaimer.css';

interface LegalDisclaimerProps {
    closeModal: () => void;
    className?: string;
}

const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ closeModal, className }) => {
  return (
    <div className={`legal-disclaimer container ${className}`} id='legal-disclaimer'>
      <h3>Bitte bestätigen Sie vor dem Fortfahren</h3>
      <p>
      Um die Integrität unserer Community und den Geist fairer Nutzung zu wahren, bitten wir Sie, zwei wichtige Punkte zu bestätigen:
      </p>
      <ol>
        <li>
          <strong>Ich besitze ein gültiges Ticket für meine Reise.</strong>  Ich verstehe, dass diese App dazu dient, das Bewusstsein und die Planung im öffentlichen Nahverkehr zu verbessern, nicht aber um Regeln oder Vorschriften zu umgehen.
        </li>
        <li>
          <strong>Ich nutze die App nicht aktiv während der Fahrt.</strong> Mir ist bewusst, dass die aktive Nutzung der App während der Fahrt andere Fahrgäste stören und gegen die Nutzungsbedingungen des Verkehrsbetriebs verstoßen kann.
        </li>
      </ol>
    <button onClick={closeModal}>Ich bestätige</button>
    </div>
  );
}

export default LegalDisclaimer;