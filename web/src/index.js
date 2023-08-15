import React from 'react';
import { createRoot } from "react-dom/client";
import Nouns from './nouns'
import Verbs from './verbs'
import About from './about'
import Notfound from './404'
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate, 
} from "react-router-dom";
const nounPath = process.env.PUBLIC_URL + "/nouns"
const verbPath = process.env.PUBLIC_URL + "/verbs"
const aboutPath = process.env.PUBLIC_URL + "/about"


const routing = (
  <Router >
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Finnish Inflexion Drill</a>
        </div>
        <ul className="nav navbar-nav mr-auto no-wrap">
          <li className="nav-item">
            <Link className="nav-link" to={nounPath}>Nouns</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={verbPath}>Verbs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={aboutPath}>About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path={process.env.PUBLIC_URL+"/"} element={<Navigate to={nounPath} />}/>
        <Route path={nounPath} element={<Nouns />} />
        <Route path={verbPath} element={<Verbs />}  />
        <Route path={aboutPath} element={<About />} />
        <Route element={<Notfound />} />
      </Routes>
    </div>
  </Router>
)
const root = createRoot(document.getElementById("root"));
root.render(routing)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
