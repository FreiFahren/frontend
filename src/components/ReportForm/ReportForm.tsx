import React from 'react';

import './ReportForm.css';
import { reportInspector } from '../../functions/dbUtils';

interface ReportFormProps {
  closeModal: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ closeModal }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const line = (document.getElementById('line') as HTMLInputElement).value;
    const station = (document.getElementById('station') as HTMLInputElement).value;
    const direction = (document.getElementById('direction') as HTMLInputElement).value;

    await reportInspector(line, station, direction);

    closeModal();
};

  return (
    <div className='report-form-container'>
      <h1>Neue Meldung</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' id='line' name='line' placeholder='Linie' />
        </div>
        <div>
          <input
            type='text'
            id='station'
            name='station'
            placeholder='Station'
          />
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
