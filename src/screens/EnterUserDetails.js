import '../App.css';

// importing the AppContext
import { AppContext } from './utils/AppContext';
// imported the AppContext

import {  useContext , useState  } from 'react';

// used to open routes
import { useHistory } from 'react-router-dom'
// used to open routes

import {Link} from 'react-router-dom'


import Select from 'react-select'

import Modal from 'react-modal'
// displays dialog

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



  //------- dialog window start -------
  const [showDialog , setDialog] = useState(false);
  const [WarningDialog , setWarningDialog ] = useState("");
  var subtitle;
  function openModal() 
  {
      setDialog(true);
  }  
  function afterOpenModal() 
  {
      subtitle.style.color = '#000000';
  }  
  function closeModal()
  {
      setDialog(false);
  }
  //------- dialog window end -------




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
// const customStyles = {
//   control: base => ({
//     ...base,
//     height: 55,
//     minHeight: 45,
    
//   })
// };


// const customStyles = {
//   container: (provided) => ({
//     ...provided,
//     display: '',
//     width: '350px',
//     minHeight: '5px',
//     textAlign: 'right',
//     border: 'none',
//     justifyContent:'center'
//   }),
//   control: (provided) => ({
//     ...provided,
//     border: '8px solid #757575',
//     borderRadius: '0',
//     minHeight: '1px',
//     height: '52px',
//     justifyContent:'center'
//   }),
//   input: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     // textAlign:'right'
  
//   }),
//   dropdownIndicator: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     paddingTop: '0',
//     paddingBottom: '0',
//     color: '#757575',
//   }),
//   indicatorSeparator: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     height: '34px',
//     textAlign:'center'
//   }),
//   clearIndicator: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//   }),
//   valueContainer: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     height: '60px',
//     paddingTop: '0',
//     paddingBottom: '0',
//     color:"#0000",
//     textAlign:'center'
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     paddingBottom: '2px',
//     textAlign:'center'
//   }),
// };
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-30%, -30%)',

    
  }
};










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
    <div className="main_container">
      <div className="header_container">
    <div>
        ENTER USER DETAILS
    </div>

      <header >
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
      </div>

    <div className="contactform_container row">

      <div className="form1 col-md-4">


          <div className="form-group row inline d-flex">
              <h2>Name : </h2>
                <input
                    className={'form-control'}
                    onChange={handleChange('name')}
                    value={capitalizeName(values.name)  }
                    placeholder="Name"
                    type="text"
                />
          </div>


          <div className="form-group row inline d-flex">
              <h2>House Name : </h2>
                  <input
                      className={'form-control'}
                      onChange={handleChange('house_name')}
                      value={ capitalizeName(values.house_name) }
                      placeholder="House Name"
                      type="text"
                  />
          </div>


          <div className="form-group row inline d-flex">
              <h2>Mobile Number : </h2>
                  <input
                      className={'form-control'}
                      onChange={handleChange('phone')}
                      value={values.phone}
                      placeholder="Phone"
                      type="text"
                  />
              </div>


          <div className="form-group row inline d-flex">
              <h2>Address : </h2>
                  <input
                      className={'form-control'}
                      onChange={handleChange('address')}
                      value={capitalizeName(values.address)}
                      placeholder="Address"
                      type="text"
                  />
          </div>

          </div>


          <div className="form2 col-md-6 d-flex row">

          <div className="form-group row inline">
              <h2>City or Town : </h2> 
              <Select className="select_bar" options={options} onChange={handleChange('town_or_city')} styles={customStyles}/>              
          </div>

          <div className="form-group row inline d-flex">
              <h2>Pin or zip : </h2>
                  <input
                      className={'form-control'}
                      onChange={handleChange('pin_or_zip')}
                      value={values.pin_or_zip}
                      placeholder="Pin or zip"
                      type="text"
                  />
          </div>


          <div className="form-group row inline d-flex">
              <h2>Land Mark : </h2>
                  <input
                      className={'form-control'}
                      onChange={handleChange('landmark')}
                      value={capitalizeName(values.landmark)}
                      placeholder="Landmark"
                      type="text"
                  />
              </div>


      </div>







      <div>
        {/* popup message  */}
          <Modal
              ariaHideApp={false}
              isOpen={showDialog}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
          >

                  <div  className="h5 confirmorder" ref={_subtitle => (subtitle = _subtitle)}>{WarningDialog}</div>
                                    
                  <div>
                          <form>                              
                              <Link to="/enteruserdetails" >
                                          <div className="card">
                                              <button 
                                                  type=" button" className="btn btn-primary"
                                                  onClick={()=>{ 
                                                      setDialog(false)   
                                                  }}
                                              >
                                                  confirm
                                              </button>
                                              
                                          </div>
                              </Link>
                              
                              
                          </form>
                  </div>
          </Modal>
        </div>
      



      <div className="btn_container col-md-12 d-flex">
        
      <button className="save_detail_btn"
       onClick={ async ()=>{ 
                           
                           if(values.name==="")
                           {
                               // alert("please enter address"); 
                               setWarningDialog("please enter name");
                               setDialog(true);  
                               console.log("dialog : " , showDialog );
                           }
                           else if(values.house_name ==="")
                           {
                               // alert("please enter house name");  
                               setWarningDialog("please enter house name");
                               setDialog(true);  
                               console.log("dialog : " , showDialog );
                           }
                           else if(values.address ==="")
                           {
                               // alert("please enter address");  
                               setWarningDialog("please enter address");
                               setDialog(true);  
                               console.log("dialog : " , showDialog );

                           }
                           else if(values.town_or_city ==="")
                           {
                               // alert("please select town or city"); 
                               setWarningDialog("please select town or city");
                               setDialog(true);  
                               console.log("dialog : " , showDialog ); 
                           }
                           else
                           {
                               setDialog(false);  
                               setWarningDialog("");
                              // console.log( " values : " , values)
                              // ContextValue.updateAddress is used to store the entered address
                              await ContextValue.updateAddress(values)
                              // console.log("userValues : " ,ContextValue.userValues)
                              history.push("/")
                           }
                          
                      } } >Save user details</button>
      </div>
    </div>
    {/* <button onClick={ async ()=>{ 
                          // console.log( " values : " , values)
                          // ContextValue.updateAddress is used to store the entered address
                          await ContextValue.updateAddress(values)
                          // console.log("userValues : " ,ContextValue.userValues)
                          history.push("/")
                      } } >Save user details</button> */}


  </div>
  </div>
)

}

function capitalizeName(name) 
{
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
}

export default App;
