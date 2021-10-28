import logo from "./logo.svg";
import "./App.css";
import BarChart from "./BarChart";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/:symbol'>
          <BarChart />
        </Route>
        <Route exact path='/'>
          <h1>Welcome to Home Page</h1>
        </Route>

        {/* <Route render={() => <Redirect to='/' />} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
