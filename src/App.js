import { Reset } from 'styled-reset';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Main from "./Main";



function App() {
  return (
    <div>
      <Reset />
      <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={Main} />
      </Switch>
      </Router>
    </div>

  );
}

export default App;
