import React from 'react';
import './ReportForm.css';

interface ReportFormProps {
  closeModal: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ closeModal }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

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
