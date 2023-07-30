import logo from './logo.svg';
import './App.css';
import pawn from "./pawn.png" ;
import ChessGame from './ChessGame';

function App() {
  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <ChessGame />
    </div>
  );
}

export default App;
