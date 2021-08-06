import '../App.css';

// importing the AppContext
import { AppContext } from './utils/AppContext';
// imported the AppContext

import {  useContext, useEffect, useState } from 'react';

// used to open routes
import { useHistory } from 'react-router-dom'
// used to open routes

// used for dropdown
import Select from 'react-select'
// used for dropdown

import {signOut} from './Auth/AuthenticationHandler' 

import ConfirmScreen from '../components/ConfirmAddedProducts'


// used to display dialog box
import Modal from 'react-modal'
// used to display dialog box

import {Link} from 'react-router-dom'

function App() {

  // ConfirmEditSwitcher
  // when app is opened this will be false .
  // So first we display the Foarm to enter details of the crops.

  // after we add products , we will press the apply button
  // this will set the ConfirmEditSwitcher to true
  // When this button is pressed we need to display another component 

  // We display a component to display the values that we entered 
  // If the user press confirm button we will send the products to db 
  
  // else there also an edit button . 
  // If he press the edit button we will set the ConfirmEditSwitcher to false . 
  // this will load the FoarmHandler to edit the product again

  const [ConfirmEditSwitcher , setConfirmEditSwitcher ] = useState(false);
  // ConfirmEditSwitcher



  // --dialog box 
  const [showDialog , setDialog] = useState(false);
  const [WarningDialog , setWarningDialog ] = useState("");
  // --dialog box 


  return(
    ConfirmEditSwitcher?
      <>
      {/* enter here if apply button is pressed  */}
      {/* display a confirm screen with product details  */}
        <ConfirmScreen setConfirmEditSwitcher={setConfirmEditSwitcher}/>
      </>
    : 
      <>
        //  form edit screen 
        <FoarmHandler setConfirmEditSwitcher={setConfirmEditSwitcher} 
                      setDialog = {setDialog}
                      setWarningDialog={setWarningDialog} />

        <DialogBox showDialog = {showDialog}
                   setDialog = {setDialog}
                   WarningDialog = {WarningDialog}
                   setWarningDialog = {setWarningDialog}
         />
      </>
  )
  
}



function DialogBox( {showDialog , setDialog, WarningDialog ,setWarningDialog} ){
        //------- dialog window start -------
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

        return(
          <div>
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
                                <Link to="/" >
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
        )
}


function FoarmHandler( {setConfirmEditSwitcher ,setDialog, setWarningDialog }) {

  // used to open routes
  let history = useHistory()
  // used to open routes
  
  // reading and printing the app context value
  const ContextValue = useContext(AppContext);
  // console.log("context value home screen : " , ContextValue)
  // app context value is stored inside ContextValue variable 



  // ------ Product entry ------
  
  //input handler

  //input handler


  // ------ Product entry ------
  // const [inputFiled , setInputField] = useState([
  //   // this is the variable array used to hold all the form inputs
  //   // when new form input added new object is attached here
  //   {itemName :'' , itemQuantity:''},

  // ])
  const inputFiled =ContextValue.ProductHolder
  const setInputField = ContextValue.setProductHolder

  const options = [
    { value: 'Payar', label: 'Payar' , itemName:'Payar' },
    { value: 'Pachakka', label: 'Pachakka' , itemName:'Pachakka'},
    { value: 'Pavakka', label: 'Pavakka' , itemName:'Pavakka' }
  ]

  // handles the value changes 
  const handleValueChanger = ( key , event  , name ) => {
    
    // Here we assign values to the inputField array in accordance with 
    // the field we entered the value and the array key 

    // console.log("key : " , key )
    // console.log("event : " , event) 
    // console.log("value : " , event.target.value ) 
    // console.log("name : " , event.target.name ) 



    if(name==="itemName"){
      // if it is item name switcher the code will enter here 
      // it is a switcher so we need this kind of a method to read the value 
      const values = [...inputFiled];
      values [key][name] = event.value;
      setInputField(values)
      // the value is read and set using setInputField

    }
    else if(name==="showOther"){
      
      // showOther  is a button 
      // it is used to : if there is a product that is not in the drop down 
      // the user can press show other button and add enter their product name directly
      
      const values = [...inputFiled];
      console.log("inputFiled : " ,  inputFiled[key]);
      values [key][name] = !inputFiled[key].showOther;
      setInputField(values)


    }
    else{
      // if the price field is changed it is handled here 
      const values = [...inputFiled];
      values [key][event.target.name] = event.target.value;
      setInputField(values)
    }
  
  }


  // ------ Product entry ------


  return (
    <div className="App">
      <div>
          HOME SCREEN
      </div>
      
        <header>
          <div>
            <button
             onClick={()=>{ 
                              signOut()
                              history.push("/")
                              }} >logout</button>

            <button
             onClick={()=>{ 
                              history.push("/enteruserdetails")
                          }} >edit user address</button>
          </div>



          <div>
        
            <div>
              {
                inputFiled.map( (inputField , index)=>(
                    // here we loop through the inputField and take inputs
                    // depends upon the length of the inputField
                    // When we append a new fild to inputFiled array a field will be also displayed in ui
                    <div  style={{ background : "gray" , padding:20 , marginTop:20 , marginBottom:10 }} >
                      <Test inputField ={inputField} />
                      <div>
                        New product  
                      </div>
                      <div>
                        <button onClick={(event)=>{ handleValueChanger( index , event , "showOther" ) }} >other product</button>
                      </div>
                      <form  >
                          <div>
                              item name : 
                                  {
                                    inputField.showOther?
                                    <div>
                                      enter other item name : 
                                      <input name="itemName" value={inputField.itemName} onChange={(event)=>{ handleValueChanger( index , event ) }} />
                                    </div>
                                    :
                                    <div>
                                      <Select 
                                          options={options} 
                                          onChange={(event)=>{handleValueChanger(index , event , "itemName"  )}} />
                                    </div>
                                  }

                          </div>
                          <div>
                              quantity  : 
                              <input name="itemQuantity"  value={inputField.itemQuantity} onChange={(event)=>{ handleValueChanger( index , event  ) }}  />
                              in kg
                          </div>
                      </form>
                    </div>
                ) )

              }
            </div>

          </div>

          <button onClick={ ()=>{ 
                                  // when adding a new field we want to check
                                  // is there any empty field
                                  // if there is an empty field we dont add a new filed . 
                                  
                                    var last_index = inputFiled.length-1;
                                    // last_index holds the index of the last added product 
                                    var last_field = inputFiled[ last_index ] ;
                                    // last field is uesed to store the values of the last filed 
                                    // , like name , quantity , etc..
                                    
                                    if(last_field.itemName==="")
                                    {
                                      setWarningDialog("please enter item  name ");
                                      setDialog(true);  
                                      // here we check if the name filed is empty 
                                      // if name field is null we dont have to add new product 
                                      // so we provide a dialog saying enter the product name 
                                      console.log("please enter item  name ");
                                    }
                                    else if ( last_field.itemQuantity==="" )
                                    {
                                      setWarningDialog("please enter item  quantity ");
                                      setDialog(true); 
                                      // here we check if the itemQuantity filed is empty 
                                      // if itemQuantity field is null we dont have to add new product 
                                      // so we provide a dialog saying enter the product itemQuantity 
                                      console.log("please enter item  quantity ");
                                    }
                                    else
                                    {
                                      setDialog(false);  
                                      setWarningDialog("");
                                      // the code enters this loop if the user has entered all the necessary filed 
                                      // if yes we add a new field .
                                      setInputField([...inputFiled , {itemName:'' , itemQuantity:'' , showOther:false }]) 
                                    }

                                  // used to add new product component .
                                  // it attaches an empty object to the array 
                                  
                                  // setInputField([...inputFiled , {itemName:'' , itemQuantity:'' , showOther:false }]) 


                                }}>Add New Product</button>
          <button onClick={()=>{
                                  console.log(" final :  " , inputFiled )
                                  setConfirmEditSwitcher(true)
                                  
                                }}>Apply</button>

        </header>




      
    </div>
  );
}


function Test(inputField){
  console.log("inputField" , inputField)
  return(
    <div/>
  )
}


export default App;
