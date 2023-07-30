import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [inCheck, setInCheck] = useState(game.inCheck());

  const [isCheckmate, setIsCheckmate] = useState(game.isCheckmate());
  const [isStalemate, setIsStalemate] = useState(game.isStalemate());
  const [isDraw, setIsDraw] = useState(game.isDraw());
  const [history, setHistory] = useState(game.history());
  const [promotion, setPromotion] = useState({ from: null, to: null }); 

  useEffect(() => {
    setFen(game.fen());
    setInCheck(game.inCheck());
    setIsCheckmate(game.isCheckmate());
    setIsStalemate(game.isStalemate());
    setIsDraw(game.isDraw());
    setHistory(game.history());
  }, [game]);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    // Check if a pawn is being moved to the 8th/1st rank
    if (game.get(sourceSquare)?.type === 'p' && (targetSquare[1] === '8' || targetSquare[1] === '1')) {
      setPromotion({ from: sourceSquare, to: targetSquare });
      return;
    }

    let move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Default to promoting to queen
    };

    try {
      let result = game.move(move);

      if (result === null) {
        throw new Error('Illegal move!');
      }

      setFen(game.fen());
      setPossibleMoves([]); 
      if (game.isGameOver()) {
        alert('Game over');
      }
    } catch (error) {
      alert('Invalid move: ' + error.message);
      return;
    }
  };

  const handlePromotion = (piece) => {
    let move = {
      from: promotion.from,
      to: promotion.to,
      promotion: piece,
    };

    try {
      let result = game.move(move);

      if (result === null) {
        throw new Error('Illegal move!');
      }

      setFen(game.fen());
      setPromotion({ from: null, to: null }); 
      setPossibleMoves([]); 
      if (game.isGameOver()) {
        alert('Game over');
      }
    } catch (error) {
      alert('Invalid move: ' + error.message);
      return;
    }
  };

  const onMouseOverSquare = (square) => {
    setPossibleMoves(game.moves({ square, verbose: true }).map(move => move.to));
  };

  const onMouseOutSquare = () => {
    setPossibleMoves([]); 
  };

  return (
    <div>
      <Chessboard
        id="chessboard"
        position={fen}
        onDrop={onDrop}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        width={400}
        orientation="white"
        squareStyles={possibleMoves.reduce((a, c) => ({ ...a,
          [c]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' } }), {})}
      />
      <p>Turn: {game.turn() === 'w' ? 'White' : 'Black'}</p>
      <p>In Check: {inCheck ? 'Yes' : 'No'}</p>
      <p>In Checkmate: {isCheckmate ? 'Yes' : 'No'}</p>
      <p>In Stalemate: {isStalemate ? 'Yes' : 'No'}</p>
      <p>In Draw: {isDraw ? 'Yes' : 'No'}</p>
      <p>Half Moves: {game.history().length}</p>
      <p>History: {history.join(', ')}</p>

      {promotion.from && (
        <div>
          <h2>Select a piece to promote to:</h2>
          <button onClick={() => handlePromotion('q')}>Queen</button>
          <button onClick={() => handlePromotion('r')}>Rook</button>
          <button onClick={() => handlePromotion('b')}>Bishop</button>
          <button onClick={() => handlePromotion('n')}>Knight</button>
        </div>
      )}
    </div>
  );
};

export default ChessGame;
