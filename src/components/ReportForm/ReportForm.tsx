import React from 'react';

import './ReportForm.css';
import { reportInspector } from '../../functions/dbUtils';
import { highlightElement } from '../../App';

interface ReportFormProps {
  closeModal: () => void;
  onFormSubmit: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ closeModal, onFormSubmit }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const line = (document.getElementById('line') as HTMLInputElement).value;
    const station = (document.getElementById('station') as HTMLInputElement).value;
    const direction = (document.getElementById('direction') as HTMLInputElement).value;

    if (station.trim() === '') {
      highlightElement('station'); // Highlight the 'station' input field
      return; // Stop the form submission process
    }

    await reportInspector(line, station, direction);

    closeModal();
    onFormSubmit(); // Notify App component about the submission
  };

  return (
    <div className='report-form container'>
      <h1>Neue Meldung</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' id='line' name='line' placeholder='Linie' />
        </div>
        <div style={{position: 'relative'}}>
          <input
            type='text'
            id='station'
            name='station'
            onFocus={() => (document.getElementById('custom-placeholder') as HTMLElement).style.display = 'none'}
            onBlur={(e) => { if (e.target.value === '') (document.getElementById('custom-placeholder') as HTMLElement).style.display = 'inline'}}
          />
          <div id='custom-placeholder' className='custom-placeholder'>
            <span>Station</span>
            <span className='red-highlight'>*</span>
          </div>
        </div>
        <div>
          <input
            type='text'
            id='direction'
            name='direction'
            placeholder='Richtung'
          />
        </div>
        <div>
          <button type='submit'>Melden</button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
