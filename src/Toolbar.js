import React from 'react';

function Toolbar(props) {
  return (
    <>
      <button onClick={props.onRun}>
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
    </>
  );
}

export default Toolbar;
