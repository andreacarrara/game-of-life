import ReactDOM from 'react-dom';
import './Modal.css';

function Modal(props) {
  return ReactDOM.createPortal(
    props.showing ?
      <div
        onClick={props.onClose}
        className='backdrop'
      >
        <div
          onClick={(event) =>
            // Prevent closing
            event.stopPropagation()
          }
          className='modal'
        >
          <h1 className='title'>
            Game of Life,
            <br />
            with a&nbsp;
            <span className='green'>t</span>
            <span className='blue'>w</span>
            <span className='purple'>i</span>
            <span className='pink'>s</span>
            <span className='orange'>t</span>
          </h1>
          <p className='subtitle'>
            The Game of Life is a zero-player cellular automation.
            How exciting, right? I promise you it is really cool, so please keep reading!
          </p>
          <hr className='divider' />
          <div className='rules'>
            <p>Every cell interacts with its eight neighbours following these four simple rules:</p>
            <ul>
              <li>Live cells with fewer than two live neighbours die by underpopulation.</li>
              <li>Live cells with two or three live neighbours live on.</li>
              <li>Live cells with more than three live neighbours die by overpopulation.</li>
              <li>Dead cells with three live neighbours become a live cell by reproduction.</li>
            </ul>
          </div>
          <p className='rules'>
            That's it! Click on cells to make them alive, then press Start to simulate the game.
            You can even click while it is running, or drag your cursor on multiple cells!
          </p>
          <p className='rules'>
            But where is the twist? For every generation a cell lives, it changes color, creating beautiful and mesmerizing patterns.
          </p>
          <hr className='divider' />
          <p className='footer'>
            To my fellow nerds, make sure to read the relative&nbsp;
            <a href='https://wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank' rel='noopener noreferrer'>Wikipedia page</a>
            &nbsp;and check out the code on my&nbsp;
            <a href='https://github.com/andreacarrara/game-of-life' target='_blank' rel='noopener noreferrer'>GitHub repository</a>
            .
          </p>
        </div>
      </div>
    : null,
    document.getElementById('root')
  );
}

export default Modal;
