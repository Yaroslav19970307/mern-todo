import React, {Component}  from 'react';

import {BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";
import ApiService from "../../service/api-service";
import Auth from "../auth";
import Register from "../register";
import Store from '../../service/store';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.apiService = new ApiService();
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        //Store.set('token', JSON.stringify({token: 123123}));
        //console.log(Store.get('token'));
        //this.apiService
            //.getTodos()
            //.then(res => console.log(res))
        //this.apiService
            //.postLogin("zharkoyaroslav@gmail.com", "A19970307")
            //.then(res => console.log(res))
    }

    render() {
        const store = JSON.parse(Store.get('token'));
        
        return (
            <div className="App">
                <Router>
                    <Route exact path="/">
                        {store ? <Redirect to="/dashboard" /> : <Redirect to="/login" component={Auth} />}
                    </Route>
                    <Route path="/login" component={Auth} />
                    <Route path="/register" component={Register} />
                </Router>
            </div>
        );
    }
}

