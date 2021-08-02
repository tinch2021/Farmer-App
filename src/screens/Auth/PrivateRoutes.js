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