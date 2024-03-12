import React, { MouseEventHandler } from 'react';

import './ReportButton.css';

interface ReportButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const ReportButton: React.FC<ReportButtonProps> = ({ onClick }) => {
    return (
        <button className='report-button' onClick={onClick}>
            <span role='img' aria-label='warning'>⚠️</span>
        </button>
    );
};

export default ReportButton;