import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
    return (
        <div className="h-full flex flex-col items-center -space-y-20 absolute top-28 left-0 bottom-0 right-0">
            <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
            </div>
            <div className="tracking-wider">
                {props.children}
            </div>
        </div>

    );
};

export default LoadingSpinner;
