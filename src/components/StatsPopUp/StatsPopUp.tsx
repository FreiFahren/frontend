import './StatsPopUp.css';

interface StatsPopUpProps {
    className: string;
}

const StatsPopUp: React.FC<StatsPopUpProps> = ({ className }) => {
    return (
        <div className={`stats-popup ${className}`}>
        </div>
    );
}

export default StatsPopUp;