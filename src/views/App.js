import React from "react";
import { Switch, Route } from "react-router-dom";
import Component from "./Component";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Component />
          </Route>
          <Route
            path="/foo/:id"
            render={props => {
              return <Component routeId={props.match.params.id} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
