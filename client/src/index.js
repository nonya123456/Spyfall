import React from 'react';
import ReactDOM from 'react-dom';
import Join from './join';
import Game from './game';
import PlayerList from './playerList';

import { io } from "socket.io-client";
const socket = io('http://localhost:8080');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.joinHandler = this.joinHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
    this.state = {
      players: [], 
      isJoined: false, 
      role: null, 
      location: null, 
      isGameStarted: false,
      voted: false,
      result: null,
      isGameFinished: false
    }
  }

  componentDidMount() {
    socket.on('players', (players) => {
      this.setState({players:players})
    })
    socket.on('role', (role, location) => {
      this.setState({role: role, location: location, isGameStarted: true})
      
    })
    socket.on('reset-response', () => {
      this.setState({players: [], isJoined: false, role: null, location: null, isGameStarted: false, voted: false, result: null, isGameFinished: false})
    })
    socket.on('result', (result) => {
      this.setState({result: result, isGameFinished: true})
    })
  }

  joinHandler(joinName) {
    this.setState({isJoined: true})
    socket.emit('join', joinName);
  }

  resetHandler() {
    socket.emit('reset');
  }

  voteHandler(name) {
    this.setState({voted: true});
    socket.emit('vote', name);
  }

  render() {
    return (
      <div>
        <div className="mx-auto mt-3 mb-3 d-flex justify-content-center">
          <Join joinHandler={this.joinHandler}/>
        </div>
        {(this.state.isJoined)? 
          <div className="mb-3">
            <Game role={this.state.role} location={this.state.location} isGameStarted={this.state.isGameStarted} socket={socket} isGameFinished={this.state.isGameFinished} result={this.state.result}/>
          </div>
          :null
        }
        <div className="mb-3">
          <PlayerList players={this.state.players} isGameStarted={this.state.isGameStarted} voted={this.state.voted} voteHandler={this.voteHandler}/>
        </div>
        <div className="mb-3">
          <button className="mx-auto btn btn-primary d-flex justify-content-center" onClick={this.resetHandler}>Reset</button>
        </div>
      </div>
      
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
