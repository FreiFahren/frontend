import React from 'react';

import './report-button.css';

const ReportButton = () => {
    return (
        <button className='report-button'>
            <span role="img" aria-label="warning">⚠️</span>
        </button>
    );
};

export default ReportButton;