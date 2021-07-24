import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
    return (

        <div className="flex load">
            <div className={`w-screen h-1/2 items-center flex flex-col justify-center ${props.asOverlay ? 'loading-spinner__overlay' : ''} `}>
                <div className="lds-dual-ring"></div>
                <div className="tracking-widest mb-2">
                    PLURALFORMS
                </div>
                <div className="tracking-wider">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
