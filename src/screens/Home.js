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
import { flushSync } from 'react-dom';


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


  return(
    ConfirmEditSwitcher?
      <>
        <ConfirmScreen setConfirmEditSwitcher={setConfirmEditSwitcher}/>
      </>
    : 
      <>
        <FoarmHandler setConfirmEditSwitcher={setConfirmEditSwitcher}/>
      </>
  )
  
}

function ConfirmScreen(setConfirmEditSwitcher){
  const ContextValue = useContext(AppContext);
  const inputFiled =ContextValue.ProductHolder
  

  return(
    <div>
        <div>
          {
          inputFiled.map( (inputField , index)=>(
                        <div>
                            <div> name: {inputField.itemName} , quantity: {inputField.itemQuantity} kg </div>
                        </div>
                        ))
          
          }
        </div>
        <button onClick={()=>{ setConfirmEditSwitcher(false) }} >edit </button>
    </div>
    
  )
}


function FoarmHandler( {setConfirmEditSwitcher}) {

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
                                  // used to add new product component .
                                  // it attaches an empty object to the array 
                                  setInputField([...inputFiled , {itemName:'' , itemQuantity:'' , showOther:false }]) 
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
