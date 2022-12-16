import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ReferralsPage from "./Views/ReferralsPage";
import LandingPage from "./Views/LandingPage";
import ReactGA from 'react-ga';




class App extends Component {
  render() {
    const TRACKING_ID = "G-VNMGQX5HPH";
    ReactGA.initialize(TRACKING_ID);
    
    return (
      <div className="global_box">
        {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav> */}

        {/* <div className="container mt-3"> */}
          <Switch>
            <Route exact path={["/", "/ref/:id"]} component={LandingPage} />
            {/* <Route exact path="/add" component={AddTutorial} /> */}
            <Route exact path="/referrals/:id" component={ReferralsPage} />
          </Switch>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
