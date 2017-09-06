import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import SignUp from './SignUp';
import Login from './Login';
import '../sass/style.scss';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class App extends Component{
    render(){
        return(

            <Router>
                <div className="">
                    <NavigationBar />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route path="/group" component={Group} />
                    <Route path="/addMember" component={AddMember} />
                    <Route path="/messageboard" component= {MessageBoard} />
                </div>
            </Router>
        )
    }
}

export default App;