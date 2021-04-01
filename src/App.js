import './App.css';
import Login from './components/login.component';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from './components/register.component';
import { Route, Switch } from 'react-router-dom';
import Profile from './components/profile.component';

function App() {
  return (
    <div className="App">
            <Switch>
                <Route path="/" component={Register} exact />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
            </Switch>

    </div>
  );
}

export default App;
