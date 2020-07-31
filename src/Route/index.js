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
                    <Link to="/"><Redirect to="/privelege" /></Link>
                    <ul>
                        <li>
                            <Link to="/privelege">Privelege</Link>
                        </li>
                        <li>
                            <Link to="/unprivelge">Unprivelge</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/privelege">
                        <SmartDropdown privelege={true} />
                    </Route>
                    <Route path="/unprivelge">
                        <SmartDropdown privelege={false}/>
                    </Route>
                    <Route path="/">
                        <SmartDropdown privelege={true}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
