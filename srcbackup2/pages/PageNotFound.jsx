import React from 'react'

const PageNotFound = () => {
  return (
    <div className="pagenotfound">
        <div className="pagenotfound">
            404 Page not found
        </div>
        <div className="backtohome">
          <Link to="/">Home</Link>
        </div>
    </div>
  )
}

export default PageNotFound;
