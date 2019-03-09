import React, { useState, useRef } from 'react';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);

  const url = `http://hn.algolia.com/api/v1/search?query=${query}`;

  const getArticles = async event => {
    event.preventDefault();
    if (!query) {
      alert('You must enter a query.');
      return;
    }
    const response = await axios.get(url);
    setArticles(response.data.hits);
  };

  const handleUpdateSearchText = event => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

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
        {articles.length && query ? (
          <p>Showing results for: {query}</p>
        ) : (
          <p>No results. Enter a search term now!</p>
        )}
        <ul>
          {articles.map(article => (
            <li key={article.objectID}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default App;
