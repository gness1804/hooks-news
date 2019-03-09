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

  const loadingElem = <p>Results loading...</p>;

  const articlesElem = (
    <ul>
      {articles.map(article => (
        <li key={article.objectID}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );

  const errorElem = (
    <p style={{ color: 'red' }}>
      Oops! There was an error fetching your results: {error}
    </p>
  );

  return (
    <>
      <form onSubmit={getArticles}>
        <input
          type="text"
          placeholder="Query"
          onChange={handleUpdateSearchText}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearQuery}>
          Clear
        </button>
        {isLoading ? loadingElem : resultsMssgElem}
        {error && errorElem}
        {articlesElem}
      </form>
    </>
  );
};

export default App;
