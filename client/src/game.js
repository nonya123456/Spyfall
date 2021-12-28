import React from 'react'



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        this.props.socket.emit('start');
    }

    render() {
        var display = (this.props.isGameStarted)? 
            <div>
                <h3 className="text-center">Role: {this.props.role}</h3>
                <h3 className="text-center">Location: {this.props.location}</h3>
            </div>:
            <button className="mx-auto btn btn-primary d-flex justify-content-center" onClick={this.onButtonClick}>
                Start Game
            </button>;
        display = (this.props.isGameFinished)? 
            <div>
                <h3 className="text-center">{this.props.result}</h3>
            </div>:
            display;
            
        return (
            <div>
                {display}
            </div>
        )
    }
}

export default Game;