import './UtilButton.css';

interface UtilButtonProps {
    onClick: () => void;
}

const UtilButton: React.FC<UtilButtonProps> = ({ onClick }) => {
    return (
        <button className='util-button' onClick={onClick}>
            <span/>
            <span/>
            <span/>
        </button>
    );
};

export default UtilButton;