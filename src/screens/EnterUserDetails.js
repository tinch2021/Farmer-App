import '../App.css';

// importing the AppContext
import { AppContext } from './utils/AppContext';
// imported the AppContext

import {  useContext , useState  } from 'react';

// used to open routes
import { useHistory } from 'react-router-dom'
// used to open routes

import Select from 'react-select'

import {signOut , isAuthenticated } from './Auth/AuthenticationHandler' 

function App() {

  // used to open routes
  let history = useHistory()
  // used to open routes

  const ContextValue = useContext(AppContext);
  // console.log("context values :" , ContextValue);

  
  // reading and printing the app context value
  const addressValue = ContextValue.userValues.user_address ;
  console.log("current address : " ,  addressValue[0] )
  const [currentAddress , setcurrentAddress] = useState(addressValue[0]) ;

  // console.log("current address : " ,  currentAddress )

  // console.log("flag : " ,  ContextValue.GotUserDetailsFlag )

  // console.log("flag : " ,  ContextValue.userValues.user_address[0] )
  
    return(
          <div>
            <AppContext>
              {
              value=>(
                    <FoarmHandler userDetails={value.userValues} history={history} ContextValue={ContextValue}   />
                )
              }
            </AppContext>
          </div>
          );
}

const FoarmHandler =({ userDetails , history , ContextValue }) =>{
  
  const  currentAddress = userDetails.user_address[0] ;
  console.log("value : " , userDetails.user_address[0] )
  // used to store foarm values
  
  const [values, setValues] = useState({
      name: currentAddress? currentAddress.name : '' ,
      phone   : isAuthenticated().phoneNumber,
      address : currentAddress? currentAddress.address : '',
      house_name : currentAddress? currentAddress.house_name : '' ,
      pin_or_zip : currentAddress? currentAddress.pin_or_zip : '' ,
      town_or_city : '',
      landmark : currentAddress? currentAddress.landmark : '',
  })
// used to store foarm values


console.log(" values :  " , values )



// town or city drop down
const options = [
                  { value: 'Adoor', label: 'Adoor' },
                ]
// town or city drop down




const handleChange = name => event => {
    // console.log("event : " ,event);
    // console.log("event : " ,name);

    // userd to enter form changes 

    if(name==='town_or_city')
    {
        // console.log("event : " ,event.value);
        // console.log("value : " ,name);
        setValues({ ...values, [name]: event.value })
    }
    else{
    setValues({ ...values, [name]: event.target.value })
    }  
}


return (
  <div className="App">
    <div>
        ENTER USER DETAILS
    </div>

      <header>
        <div>
          <button
          onClick={()=>{ 
                            signOut()
                            history.push("/")
                            }} >logout</button>
        </div>
        
        <div>
          order
        </div>
      </header>



      <div className="form">


          <div className="form-group">
            name : 
              <input
                  className={'form-control'}
                  onChange={handleChange('name')}
                  value={capitalizeName(values.name)  }
                  placeholder="Name"
                  type="text"
              />
          </div>
          <div className="form-group">
            House Name
              <input
                  className={'form-control'}
                  onChange={handleChange('house_name')}
                  value={ capitalizeName(values.house_name) }
                  placeholder="House name"
                  type="text"
              />
          </div>
          <div className="form-group">
            Phone : 
              <input
                  className={'form-control'}
                  onChange={handleChange('phone')}
                  value={values.phone}
                  placeholder="Phone"
                  type="text"
              />
          </div>
          <div className="form-group">
            Address : 
              <input
                  className={'form-control'}
                  onChange={handleChange('address')}
                  value={capitalizeName(values.address)}
                  placeholder="Address"
                  type="text"
              />
          </div>

          <div className="form-group">
          town or city : 
              <Select options={options} onChange={handleChange('town_or_city')} />

              
              
          </div>
          <div className="form-group">
            Pin or Zip : 
              <input
                  className={'form-control'}
                  onChange={handleChange('pin_or_zip')}
                  value={values.pin_or_zip}
                  placeholder="Pin or zip"
                  type="text"
              />
          </div>

          <div className="form-group">
            Landmark : 
              <input
                  className={'form-control'}
                  onChange={handleChange('landmark')}
                  value={capitalizeName(values.landmark)}
                  placeholder="Landmark"
                  type="text"
              />


          </div>
      </div>
    <button onClick={ async ()=>{ 
                          // console.log( " values : " , values)
                          // ContextValue.updateAddress is used to store the entered address
                          await ContextValue.updateAddress(values)
                          // console.log("userValues : " ,ContextValue.userValues)
                          history.push("/")
                      } } >Save user details</button>



  </div>
)

}

function capitalizeName(name) 
{
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
}

export default App;
