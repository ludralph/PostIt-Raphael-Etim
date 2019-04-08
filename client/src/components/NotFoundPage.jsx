import React from 'react';
import { Link } from 'react-router-dom';

 /**
  * Renders HTML markup for NotFound page
   * @return {String} Returns html markup for NotFoundPage component
   */
export const NotFoundPage = () => (
    <div className="center notFound">
      <div>
        <h1 className="notFoundText">Page Not Found</h1>
        <p>Sorry, there is nothing to see here.</p>
        <p><Link to="/"><b>Back to Home</b></Link></p>
      </div>
    </div>
  );


export default NotFoundPage;
