import React from 'react';

import './InnerLoader.css';

const InnerLoader = props => {
    return (
        <div className="w-full h-full flex items-center justify-center pt-1">
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
        </div>
    );
};

export default InnerLoader;
