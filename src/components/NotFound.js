import React from 'react';
import './styles/NotFound.css';

const NotFound = () => {
    return (
      <div className='not-found-container' > 
        <div className="NotFound">
            <div className="number">404</div>
            
            <div className="text">
                <span>Ooops...</span>
                <br />
                page not found
            </div>
            <a
                className="me"
                href="https://codepen.io/uzcho_/pens/popular/?grid_type=list"
                target="_blank"
                rel="noopener noreferrer"
            >
            </a>
        </div>
        </div>
    );
};

export default NotFound;
