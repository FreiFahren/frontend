import './ReportForm.css';

const ReportForm: React.FC = () => {
    return (
        <div className='report-form-container'>
            <h1>Neue Meldung</h1>
            <form>
                <div>
                    <input type='text' id='station' name='station' placeholder='Station' />
                </div>
                <div>
                    <input type='text' id='line' name='line' placeholder='Linie' />
                </div>
                <div>
                    <input type='text' id='direction' name='direction' placeholder='Richtung' />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>

        </div>
    );
}

export default ReportForm;