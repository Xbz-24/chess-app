import React, {useState} from "react";
import Chessboard from "chessboardjsx";
import Chess  from 'chess.js';

const ChessGame = () => {

  const [fen, setFen] = useState("start");
  const [game, setGame] = useState(new Chess());

  const onDrop = ({sourceSquare, targetSquare}) => {

    let tempGame = new Chess(game.fen());

    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen for simplicity
    });

    // illegal move
    if(move === null) return;

    setGame(tempGame);
    setFen(tempGame.fen());
    if(tempGame.game_over()){
      alert("Game over");
    }
  };
  return (
    <Chessboard
    id = "chessboard"
    position = {fen}
    onDrop = {onDrop}
    width = {400}
    orientation = "white"
    />
  );
};

export default ChessGame;