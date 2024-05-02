import './Search.css';

const Search = () : JSX.Element => {

    return (
        <div className="searchBox">
            <label htmlFor="orderId">Order Id:</label>
            <input id="orderId" type="text" />
            <button>Search</button>
            {/* <label htmlFor="countrydd">Country:</label>
            <input id="countrydd" type='drop-down'></input> */}
        </div>
    );
}

export default Search
