import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS} from './components/winning-combinations';
import GameOver from './components/GameOver';

const initialGameBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    return 'O';
  }
  return 'X';
}


function deriveWinner(gameBoard, players) {
  let winner

  for( const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if( firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol && 
       firstSquareSymbol === thirdSquareSymbol
     ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  
 let gameBoard = initialGameBoard()
      
      for (const turn of gameTurns) {
          const { square, player } = turn;
          const { row, col } = square;

          gameBoard[row][col] = player;
      }
      
  

  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner


  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns); 
      const newTurn = { square: { row: rowIndex, col: colIndex }, player: currentPlayer };
      return [newTurn, ...prevTurns];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} /> }   
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
