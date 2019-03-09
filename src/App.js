import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [finalQuery, setFinalQuery] = useState('');

  const url = `http://hn.algolia.com/api/v1/search?query=${finalQuery}`;

  const getArticles = async () => {
    if (!finalQuery) {
      return;
    }
    const response = await axios.get(url);
    setArticles(response.data.hits);
  };

  useEffect(() => {
    try {
      getArticles();
    } catch (err) {
      /* eslint-disable no-console */
      console.error(
        `Error in fetching data: ${err.message || JSON.stringify(err)}`,
      );
      /* eslint-enable no-console */
    }
  }, [finalQuery]);

  const handleUpdateSearchText = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!query) {
      alert('You must enter a query.');
      return;
    }
    setFinalQuery(query);
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Query"
          onChange={handleUpdateSearchText}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
        {finalQuery ? (
          <p>Showing results for: {finalQuery}</p>
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
