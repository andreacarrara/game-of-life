import React from 'react';
import './Toolbar.css';

function Toolbar(props) {
  return (
    <div className='toolbar'>
      <button
        onClick={props.onRun}
        style={{
          backgroundColor: props.running ? '#ff5757' : '#7ed957'
        }}
      >
        {props.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={props.onClear}>
        Clear
      </button>
      <p>
        Generation: {props.generation}
      </p>
      <h1>
        Game of Life
      </h1>
    </div>
  );
}

export default Toolbar;
