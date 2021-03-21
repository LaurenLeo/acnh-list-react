import React from "react";
import AnimalList from "./AnimalList";
import Animal from "./Animal";
import { Route, Switch} from "react-router-dom";


function App() {
  return (
   <Switch>
     <Route exact path="/" render={(props) => <AnimalList {...props} />} />
     <Route
      exact
      path="/:animalId"
      render={(props) => <Animal {...props} />}
      />
   </Switch>
  );
}

export default App;
