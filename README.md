

## 1. routing 

write routing modules in `App.js`
install react-router-dom using the command 

    npm install -S react-router-dom

Next create a folder `src/screens` 

Inside that create a file `test.js`

copy content from `App.js` into the `test.js`

also change the path of `App.css` and `logo.svg as below`

now test.js will look like :

```js
import logo from '../logo.svg';
import '../App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```


Now edit App.js and add routing module to it to route to test.js
`App.js` will look like : 


```js
import logo from './logo.svg';
import './App.css';
import test from './screens/test';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/"  exact component={test} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

```

Now when we start the app we can see the app routes to the `test.js` page

* Create another file `Home.js` inside the component folder copy paste `test.js` and print some messages like this is home :

The `Home.js` will look like :

```js
import logo from '../logo.svg';
import '../App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Home yea
        </a>
      </header>
    </div>
  );
}
export default App;

```


Also edit the `App.js` file and in that import `Home.js` and add a new route to it 
`App.js` will look like :

```js
import logo from './logo.svg';
import './App.css';

import test from './screens/test';
import Home from './screens/Home';


import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/"  exact component={Home} />
          <Route path="/test"  exact component={test} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

```

* Now if we go to http://localhost:3000/ there'll be a message saying `Home Yea`

* and if we go to http://localhost:3000/test it will show the test page 




Now lets create some more sub routes for our project .


---


## Login page 


* Create a folder `screens/Auth`

* Now we need to create a file `screens/Auth/Login.js` file in side `Auth` folder

* Add `Login.js` to the router in `App.js`

## Authenticated or not 

* We are using otp method to login the user . Once the user is logged in we never ask him otp again untill he logs out of his account .

* We are doing this by saving the phone number to local storage using `jwt token ` concept. 

* When a user enters the page first time he has to enter his phone number . Then we check the otp . If otp is varified then we store his phone number to a `jwt` token. 


* So when a user loads the page the page first check if there is a jwt toke saved locally . If yes we will read the phone number from the jwt token and route him to the `Home.js` page else he is re-directed to the `Login.js` 
page .


Now lets create a file `Auth/AuthenticationHandler.js`

```js
export const isAuthenticated = () => {
    // this function is used to check if the person is authenticated or not
    if(typeof window == 'undefined')
    {
        // this if loop is used for some special cases
        // it is not required but used for precaution 
        return false
    }
    
    if(localStorage.getItem('jwt-farmer-auth'))
    {
        // If jwt token is present in the local storage then this loop is executed
        // and if it is available then the jwt token is read 
        // and returned to the function where it is called from 
        return JSON.parse(localStorage.getItem('jwt-farmer-auth'))
    }
    else
    {
        // If jwt token is not present in the local storage then this loop is executed
        // if it is not present then false is returned .
        return false
    }
}


export const signOut = () => {
    // used for sign out 
    if(typeof window != 'undefined')
    {
        // when the signed out is pressed the jwt token is removed 
        // from the local storage 
        localStorage.removeItem('jwt-farmer-auth',JSON.stringify())
    }
}

export const authenticate_save_jwt = ( phoneNumber )=>{
    // called when a new phone number is need to add 
    // so data holds the phone number . 
    
    if(typeof window != 'undefined')
    {
        // then the data is saved using jwt 
        localStorage.setItem('jwt-farmer-auth',JSON.stringify(phoneNumber))
        // if the phone number is authenticated 
        // then we need to load the datas from the server. 
        // for that we call next function 
        next()
    }
}

function next()
{
    // load the user details
    console.log(" next function ");
}
```


## `2 . CONTEXT `

Lets create a context file to store the global variables .

Create a file `utils/AppContext`

```js
import React from 'react';
import {createContext , useState } from 'react' ;

export const AppContext = createContext();

export const AppContextProvider = ( {children} )=>{

    const [test , settest ] = useState("test");

    const contextValue = { test,settest}
    
    return(
        <AppContext.Provider value={contextValue} >
            {children}
        </AppContext.Provider>
    )
}  
```

Now lets include the context in the `App.js` and put our childs inside that .

So that we can access it from anywhere . 

`App.js`:
```js
import logo from './logo.svg';
import './App.css';
import test from './screens/test';
import Home from './screens/Home';
import Login from './screens/Auth/Login';
import {AppContextProvider} from './screens/utils/AppContext';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {  
  return (
    <Router>
      <div>
        <AppContextProvider>
                  <Switch>
                      <Route path="/"  exact component={Home} />
                      <Route path="/test"  exact component={test} />
                      <Route path="/login"  exact component={Login} />
                  </Switch>
        </AppContextProvider>
      </div>
    </Router>
  );
}
export default App;

```

Now Lets use the context in Home.js :


```js
import logo from '../logo.svg';
import '../App.css';

// importing the AppContext
import { AppContext } from './utils/AppContext';
// imported the AppContext
import {  useContext } from 'react';
function App() {
  // reading and printing the app context value
  const ContextValue = useContext(AppContext);
  console.log(ContextValue)
  // app context value is stored inside ContextValue variable 
  return (
    <div className="App">
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home yea
          </a>
        </header>
      
    </div>
  );
}
export default App;

```

Now when the page is load we can see the `ContextValue` is loged in the console 

## `3. RE-ROUTE USER TO LOGIN IF NOT AUTHENTICATED `


If the user is not authenticated we need to re-route him to the `Login.js` page . 

* For an example if a user who is not authenticated the otp enter the url to the browser `http://localhost:3000/`  We dont want him to see the home page because he is not authenticated .

* For such cases we need a rerouting mechanism 
* when un authenticated user enters `http://localhost:3000/` then we need him to re-route to `http://localhost:3000/login` .

So to do that lets create a file `Auth/PrivateRoutes.js` .


```js
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from './AuthenticationHandler'
// this line imports isAuthenticated function from the AuthenticationHandler

const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} 
       render= {
        props => isAuthenticated() ? 
            // if number is authenticated then this is executed
            // the route called will be opened 
            (
                <Component {...props} />
            ) 
        : 
            // if number is not authenticated then this is executed
            // then the user is re-routed to /login page
            (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
        } 
    
    />
)

export default PrivateRoute
```

## `4 .FIREBASE`

Now lets create a file `Auth/Firebase.js`

```js
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCAXbQ9-j_ah0scqU8h_oea7zn7IN7EgXo",
    authDomain: "authtestotp-20c40.firebaseapp.com",
    projectId: "authtestotp-20c40",
    storageBucket: "authtestotp-20c40.appspot.com",
    messagingSenderId: "406911817001",
    appId: "1:406911817001:web:a52cc222e6d10a07b3d338",
    measurementId: "G-WB3117M2ZN"
  };

firebase.initializeApp(firebaseConfig)
export default firebase
```

