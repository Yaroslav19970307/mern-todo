import React from 'react';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    onChangePass = (e) => {
        this.setState({password: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.password.length < 7)
        {
            console.log('erroe');
        }
        console.log(`${this.state.email} ${this.state.password}`);
        this.setState( {
            email: '',
            password: ''
        });
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}>
                <input type="email"
                       onChange={this.onChangeEmail}
                       placeholder="email"
                       value={this.state.email}/>
                <input type="password"
                       onChange={this.onChangePass}
                       placeholder="password"
                       value={this.state.password}/>
                <button>Registrate</button>
            </form>
        )
    }
}
