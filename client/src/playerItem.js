import React from 'react'

class PlayerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: false};
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        this.props.voteHandler(this.props.name);
        this.setState({selected: true});
    }

    render() {
        const style = (this.state.selected)? "list-group-item d-flex justify-content-between align-items-center list-group-item-info": "list-group-item d-flex justify-content-between align-items-center";
        return (
            <li className={style} key={this.key}>
                {this.props.name}
                <span className="badge badge-primary badge-pill" style={{visibility:(this.props.isGameStarted && !this.props.voted)? "visible" : "hidden" }}>
                    <button className="btn btn-primary" onClick={this.onButtonClick}>
                        Vote
                    </button>
                </span>
            </li>
        )
    }
}

export default PlayerItem;