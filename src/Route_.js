import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import App1 from './DcentMedia/App.js'
import App2 from './Dcentragram/App.js'
import App3 from './Dvideo/App.js'


export default function Route_() {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                    <Route exact path="/">
                        <App1 />
                    </Route>
                    <Route path="/image">
                        <App2 />
                    </Route>
                    <Route path="/video">
                        <App3 />
                    </Route>

                    </Switch>
                </div>
            </Router>
        </div>
    )
}
