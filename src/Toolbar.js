import React from 'react';
import './Toolbar.css';

function Toolbar(props) {
  return (
    <div className='toolbar'>
      <button
        onClick={props.onRun}
        className='control'
        style={{
          backgroundColor: props.running ? '#ff5757' : '#7ed957'
        }}
      >
        {props.running ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={props.onClear}
        className='control'
      >
        Clear
      </button>
      <p className='generation'>
        Generation: {props.generation}
      </p>
      <h1 className='header'>
        Game of Life
      </h1>
      <button
        onClick={props.onInfo}
        className='info'
      >
        i
      </button>
    </div>
  );
}

export default Toolbar;
