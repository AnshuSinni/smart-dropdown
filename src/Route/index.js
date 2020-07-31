import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import SmartDropdown from '../SmartDropdown/index';

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/"><Redirect to="/parent" /></Link>
                    <ul>
                        <li>
                            <Link to="/parent">Parent</Link>
                        </li>
                        <li>
                            <Link to="/child">Child</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/parent">
                        <SmartDropdown parent={true} />
                    </Route>
                    <Route path="/child">
                        <SmartDropdown parent={false}/>
                    </Route>
                    <Route path="/">
                        <SmartDropdown parent={true}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
