import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const url = 'http://hn.algolia.com/api/v1/search?query=reacthooks';
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
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
  }, []);
  return (
    <>
      <ul>
        {articles.map(article => (
          <li key={article.objectID}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
