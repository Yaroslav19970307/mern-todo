import React, { Component } from 'react';

import { Link, Route, Redirect } from 'react-router-dom';
import ApiService from '../../service/api-service';
import Store from '../../service/store';

import './auth.css';


class Auth extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false
        };
        this.apiService = new ApiService();
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    onChangePass = (e) => {
        this.setState({password: e.target.value});
    }

    clearState = () => {
        this.setState({
            email: '',
            password: '',
            login: true
        });
    }

    onSubmit = (e) => {
        const { email, password } = this.state;

        e.preventDefault();

        this.apiService
            .postLogin(email, password)
            .then((res) => {
                const store = JSON.parse(Store.get('token'));
                if (!store) {
                    Store.set('token', JSON.stringify(res));
                    Store.set('email', JSON.stringify(email));
                    Store.set('pass', JSON.stringify(password));
                }
            })

        this.clearState();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="email"
                    onChange={this.onChangeEmail}
                    placeholder="email"
                    value={this.state.email}/>
                <input type="password"
                    onChange={this.onChangePass}
                    placeholder="password"
                    value={this.state.password}/>
                <button>Sing Up</button>
                <Link to='/register'>Register</Link>  
            </form>
        );
    }
}


export default Auth;