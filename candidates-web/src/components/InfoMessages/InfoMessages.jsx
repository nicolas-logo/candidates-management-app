// eslint-disable-next-line react/prop-types
export const InfoMessages = ({ apiErrorMessage, loading }) => (
    <div data-testid="info-messages">
        {apiErrorMessage !== null && <span className='text-danger'>{apiErrorMessage}</span>}
        {loading && !apiErrorMessage && <h4 className='text-white'>Loading...</h4>}
    </div>
)
