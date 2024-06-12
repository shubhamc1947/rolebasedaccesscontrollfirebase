import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="pagenotfound">
      <h1>404</h1>
      <p>Page not found</p>
      <div className="backtohome">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
