import React, {useState, useEffect} from "react";
import {Chess} from "chess.js";
import Chessboard from "chessboardjsx";

const ChessGame = () => {

  const [fen, setFen] = useState("start");
  const [game, setGame] = useState(new Chess());

  const onDrop = ({sourceSquare, targetSquare}) => {
    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen for simplicity
    });

    // illegal move
    if(move === null) return;
    setFen(game.fen());
  };

  return (
    <Chessboard
    id = "chessboard"
    position = "{fen}"
    onDrop = {onDrop}
    width = {400}
    orientation = "white"
    />
  );
};

export default ChessGame;