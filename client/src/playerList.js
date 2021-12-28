import React from 'react';
import PlayerItem from './playerItem';

class PlayerList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const playerList = this.props.players.map(e => <PlayerItem key={e} name={e} isGameStarted={this.props.isGameStarted} voted={this.props.voted} voteHandler={this.props.voteHandler}/>)
        return (
            <ul className="list-group w-50 mx-auto d-flex justify-content-center">
               {playerList}
            </ul>
        )
    }
}

export default PlayerList;