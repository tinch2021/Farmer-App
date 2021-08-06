import React, {  useState } from 'react'

import Firebase from './Firebase'
// import { AppContext } from '../utils/AppContext';
// import {  useContext } from 'react';

// used to open routes
import { useHistory } from 'react-router-dom'
// used to open routes



import { authenticate_save_jwt, isAuthenticated } from './AuthenticationHandler'
import "./loginpage1.css"
import Login1 from "./Images/login_image1.png"
function App() {


  // used to open routes
  let history = useHistory()
  if(isAuthenticated){
    
  }
  else{
    console.log("not authenticated")
    history.push('/')
  }
  // used to open routes


  // const ContextValue = useContext(AppContext);
  // console.log(ContextValue)

  //used to hold the main values in the file 
  const [values, setValues] = useState({
    otp: '',
    mobile: '',
    confirmationResult: '',
    c_error:'',
    redirectToReffer:false,
  })

  const [ showGetOtpButton , SetshowGetOtpButton ] = useState(true)
  


  // handle change is called when there is a change in the input box
  const handleChange = name => event => {    
    // console.log(name ," : ",event.target.value);
    setValues({ ...values, [name]: event.target.value })
  
  }


  const getOtp = () => {
    // this function sends otp to the mobile number using firebase. 
    let phoneNumber = "+91" + values.mobile
    console.log("otp section : " , phoneNumber );

    if( (values.mobile==="") || ( values.mobile.length<10 ) )
    {
      // enter here if the entered phone number is null 
      //  or the number is less than 10 digit
      SetshowGetOtpButton(true);
      // SetshowGetOtpButton(true); will set the get otp button button visibility to true 
      // if it is true then the button is visible . 
      // if the number is not entered this button will be visible 
      console.log("enter valid phone number" );
    }
    else
    {
      console.log("got phone number" );
      // this section is executed if the user enter a valid phone number . 
      // if it is a valid number first we disable the get otp button using below line 
      SetshowGetOtpButton(false);
      // SetshowGetOtpButton(false); will disable the get otp button
      


      // Firebase otpsent section START
      let recaptcha = new Firebase.auth.RecaptchaVerifier('recaptcha-container')
      Firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
      .then(function (e) {
          
          setValues({ ...values, confirmationResult: e })
          console.log("OTP is sent");
          
      })
      .catch(function (error) {
          console.log(error);
          alert(error)
          
      });
      // Firebase otp sent section END
    }
    
    
  }


  const RedirectToHome =() =>{
    // used to redirect to home screen 
      history.push("/")
  }

  const submitOTP = (e)=>{
    
  // read the entered otp 
    let code = values.otp
    console.log("otp : " , code );
    // console log the entered otp 

    // confirm the otp
    values.confirmationResult.confirm(code).then((result)=>{
        console.log(result.user,"User")
        // if the otp is correct it enters here 
        authenticate_save_jwt({
            phoneNumber : "+91" + values.mobile
        })
    })
    .then((data)=>{
          // console.log("data is : " , data)
          RedirectToHome()
      })
    .catch(err=>{
      // if otp is wrong it enter here
        console.log("error")
        alert("error or wrong otp")
    })

  }


  
  return (
    <div className="App">


       {/* <span>
            <h1>
                Login
            </h1>
       </span> */}
      
      {/* header section */}

      <div>
        {
          // if confirmationResult equal to zero 
          // then the enter phone number screen is displayed
          values.confirmationResult.length === 0 &&
          <div className="login_main row">
          <div className="login_backg col-md-6">
          <img className="login_image1 d-flex" src={Login1} alt="" />
          </div>
          <div className="login_container d-flex col-md-6 justify-content-center">
          {/* header section */}
          <div className="login_small_container">
            <span>
            <h1>
                Login
            </h1>
       </span> 
          <div>
            <div>
               <input type="text" name="mobile"
                                              placeholder="Mobile Number"
                                              onChange={handleChange('mobile')}
                                              value={values.mobile}
                                              required/> 
              </div>
              <div id="recaptcha-container"></div>
              <div >
                          {
                            // if the phonenumber is not entered 
                            // the showGetOtpButton will be true
                            // the get otp button is displayed 
                          showGetOtpButton ?
                              <>
                                  <button onClick={() => {
                                                              getOtp()
                                                          }}
                                                      >Get OTP</button>
                              </>
                              :
                              <>
                              </>
                          }        
              </div>
          </div>
          </div>
      </div>
      </div>
        }
      
      </div>


      {/* fffffffffffffffffffffffffffffff */}

      <div>
        {
          // if confirmationResult not equal to zero then the otp is sent
          // then the enter otp section is displayed    
          values.confirmationResult.length !== 0 &&
          <div className="login_main row">
          <div className="login_backg col-md-6">
          <img src={Login1} alt="" className="login_image1 d-flex" />
          </div>
          <div className="login_container d-flex justify-content-center col-md-6">
          <div className="login_small_container">
          <span>
            <h1>
                Login
            </h1>
       </span>
              <div>
                
                <input id="otp" type="text"
                       name="otp" placeholder="OTP"
                       onChange={handleChange('otp')}
                       value={values.otp} required/>

                <span class="focus-input100"></span>
              </div>
              <div id="recaptcha-container"></div>

              
              <button onClick={()=>{submitOTP() } } >
                  Submit Otp
              </button>

              
              
              <button onClick={() => {
                          // executed when retry button is pressed
                          // if pressed confirmationResult and otp is set to null
                          setValues({...values, confirmationResult: '' , otp: ''})
                          // then we set SetshowGetOtpButton(true) 
                          // so that the enter phone number page is displayed
                          SetshowGetOtpButton(true)
                          RedirectToHome()
                        }} >
                    Retry
              </button>

              </div>
      </div>

          </div>
          
        }
      </div>
      </div>

      

    
 
  );
  
  






  
}

export default App;
