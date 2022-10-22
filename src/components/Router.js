import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';

const AppRouter = (isLoggedIn) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <>
                    <Route exact path= "/">
                        <Auth />
                    </Route>
                    </> 
                ) : (
                    <Route exact path= "/"> 
                        <Home /> 
                    </Route>
                )}
            </Switch>
        </Router>
        )
}

export default AppRouter;