// eslint-disable-next-line react/prop-types
export const InfoMessages = ({ apiErrorMessage, megaverse, loading }) => (
    <div data-testid="info-messages">
        {apiErrorMessage !== null && <span className='text-danger'>{apiErrorMessage}</span>}
        {megaverse === null && !loading && !apiErrorMessage && <h4 className='text-warning'>An error ocurred</h4>}
        {loading && !apiErrorMessage && <h4 className='text-white'>Loading...</h4>}
    </div>
)
