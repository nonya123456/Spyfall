import React from 'react';

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''}
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.joinHandler(this.state.name);
    }

    render() {
        return (
            
            <div>
                <form className="row gy-1 gx-2 align-items-center" onSubmit={e => this.onFormSubmit(e)}>
                    <div className="col-auto">
                        <label className="visually-hidden">Name:</label>
                        <input className="form-control" id="autoSizingInput" placeholder="Enter your name" type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className="col-auto">
                        <input className="btn btn-primary" type="submit" value="JOIN"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Join;