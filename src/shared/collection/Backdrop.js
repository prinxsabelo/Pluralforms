
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {

  return ReactDOM.createPortal(

    <div className="backdrop fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
