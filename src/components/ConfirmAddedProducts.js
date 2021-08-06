import '../App.css';

// importing the AppContext
import { AppContext } from '../screens/utils/AppContext';
// imported the AppContext

import {  useContext } from 'react';


function App( {setConfirmEditSwitcher} ) {

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
        <button onClick={()=>{ 
                                  ContextValue.SendProduct()
                                  setConfirmEditSwitcher(false)
                                  // setConfirmEditSwitcher(false) will redirect to the form page
                              }} >confirm </button>
    </div>
  )
  
}

export default App;
