
import './App.css';

import test from './screens/test';
import Home from './screens/Home';
import Login from './screens/Auth/Login';
import EnterUserDetails from './screens/EnterUserDetails';

import PrivateRoute from './screens/Auth/PrivateRoutes';


import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

// importing context
import {AppContextProvider} from './screens/utils/AppContext';
// importing context



function App() {
  
  return (
    <Router>
      <div>
        {/* using the context provider */}
        <AppContextProvider> 
          
                  <Switch>
                      <Route path="/test"  exact component={test} />
                      <Route path="/login"  exact component={Login} />

                      {/* private route is called only if the user is authenticated */}
                      <PrivateRoute path="/"  exact component={Home} />
                      <PrivateRoute path="/enteruserdetails"  exact component={EnterUserDetails} />
                      {/* private route is called only if the user is authenticated */}
                  </Switch>

        </AppContextProvider>
        {/* using the context provider */}

      </div>
    </Router>
  );
}

export default App;
