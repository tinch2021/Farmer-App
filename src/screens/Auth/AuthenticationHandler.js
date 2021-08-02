
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
        console.log(" is authenticated ");
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

    }
}

