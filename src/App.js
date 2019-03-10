import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [shownQuery, setShownQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef(null);

  const url = `http://hn.algolia.com/api/v1/search?query=${query}`;

  const getArticles = async event => {
    event.preventDefault();
    if (!query) {
      alert('You must enter a query.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setArticles(response.data.hits);
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    }
    setIsLoading(false);
  };

  const handleUpdateSearchText = event => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  useEffect(() => {
    setShownQuery(query);
  }, [articles]);

  const resultsMssgElem =
    articles.length && shownQuery ? (
      <p>
        Showing results for: <strong>{shownQuery}</strong>
      </p>
    ) : (
      <p>No results. Enter a search term now!</p>
    );

  const loadingElem = (
    <p className="font-bold text-orange-dark">Results loading...</p>
  );

  const articlesElem = (
    <ul className="list-reset leading-normal">
      {articles.map(article => (
        <li key={article.objectID}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-dark hover:text-indigo-darkest"
            style={{ textDecoration: 'none' }}
          >
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );

  const errorElem = (
    <p className="text-red font-bold">
      Oops! There was an error fetching your results: {error}
    </p>
  );

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={getArticles} className="mb-2">
        <input
          type="text"
          placeholder="Query"
          onChange={handleUpdateSearchText}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          onClick={clearQuery}
          className="bg-teal text-white p-1 rounded"
        >
          Clear
        </button>
        {isLoading ? loadingElem : resultsMssgElem}
        {error && errorElem}
        {articlesElem}
      </form>
    </div>
  );
};

export default App;
