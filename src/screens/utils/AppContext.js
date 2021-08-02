import React from 'react';
import {createContext , useState , useEffect } from 'react' ;
import axios from 'axios'
import qs from 'qs';
import {isAuthenticated} from '../Auth/AuthenticationHandler'


export const AppContext = createContext();

const Base_URL = 'https://nammudevipani.in'



export const AppContextProvider = ( {children} )=>{

    const [test , settest ] = useState("test");

    // GotUserDetailsFlag is used as a flag .
    //  it is true if there is address for a phone number present in the database
    const [ GotUserDetailsFlag , SetGotUserDetailsFlag ] = useState(false)
    const[userValues,setUserValues] = useState({
        user_address : [],
   })




    useEffect(() => {
        
        async function fetchData() {
           await  fetchUserDetails()
        }
        
        fetchData();

      }, [] ); 
      

    const fetchUserDetails= async ()=>{
        // used to fetch user details from the db when we enter phone number
        if(isAuthenticated())
        {
            // if the number is authenticated we will load the details 
            let phoneNo = isAuthenticated().phoneNumber;
            console.log("phone num init user:" , phoneNo);
            let phoneNumber ;
            try
            {
                phoneNumber = (phoneNo).substring(3);
                console.log("phone num rem init user :" , phoneNumber);
            }
            catch{

            }

            await axios({
                'method'    :   'POST',
                'url'       :   `${Base_URL}/phpFiles/getUserDetails.php`,
                'headers'   :   {
                                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                                },
                'data'      :  qs.stringify({
                                // 'userPhone': phoneNumber,
                                'userPhone': phoneNumber,
                                
                                }),
            })
            .then (res =>{
                // if success
                if(res.status === 202)
                {
                    // console.log("got202 : ",res.data.useraddress[0]);
                    var name_full = res.data.useraddress[0];
                    var name = name_full.name;
                    
                    if( (name==='notfound') || (name==='name') || (name==='postError') )
                    {
                        // code enters here if there is no user found
                        // console.log("no user");
                        SetGotUserDetailsFlag(false)   
                        // GotUserDetailsFlag is set to false so the user is redirected to the enteruserdetails page
                    }
                    else
                    {
                        // the user details are loaded to the userValues
                        // console.log("res :");
                        // console.log(res.data);
                        setUserValues({
                                        ...userValues,
                                        user_address : [res.data.useraddress[0]], // match it from backend
                                    });

                                    
                        SetGotUserDetailsFlag(true)   
                    }
                    
                    
                    // console.log("data : ",userValues);
                }
            }).catch(err=>{
                SetGotUserDetailsFlag(false)   
            })

            
        }

    }

   


    const updateAddress = async ( address ) =>{
        // called when user add or edit his address

        let phoneNo = isAuthenticated().phoneNumber;
        // read the phone number 

        let phoneNumber;
        try{
            // removes +91 from phone number
            phoneNumber = (phoneNo).substring(3);
            console.log("phone num rem init user :" , phoneNumber);
        }
        catch{

        }


        console.log("address : " , address );
        var pin_or_zip = address.pin_or_zip;
        if(pin_or_zip==="")
        {
            // if pin or zip is not entered set it to none 
            pin_or_zip = "none";
        }

        
        // then we send the url encoded data to the backend 
        // the query is called usig axios 
        axios({
            'method'    :   'POST',
            'url'       :   `${Base_URL}/phpFiles/farmerBackend/userAddOrEditAccount.php`,
            'headers'   :   {
                                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                            },
            'data'      :  qs.stringify({
                            'userPhone': phoneNumber,
                            'userName' : address.name,
                            'houseName' : address.house_name ,
                            'userAddress' : address.address ,
                            'userTownOrCity' : address.town_or_city ,
                            'userPostalcodeOrZip' :pin_or_zip  ,
                            'userLandmark' : address.landmark ,
                            }),
        })
        .then(res =>{
            // after query this function is executed 
            // The response will be 202 if the query is a success
            if(res.status === 202)
            {
                // setUserValues will update the new user value to the userValues
                setUserValues({
                                ...userValues,
                                user_address: [address],
                            })

                // set the GotUserDetailsFlag to true
                SetGotUserDetailsFlag(true)   
                // this sets the got user details flag to true .
                // because we have updated the new user details
                // so when we refresh the page it should load the home page directly . 
            }
        }).catch(err=>{
            // enters here if query catches any error
            // set the GotUserDetailsFlag to false 
            SetGotUserDetailsFlag(false)
        })


        
        
        
    }

    // used to store user address and other values 
    
    // ------------- product section -------------

    const [ProductHolder , setProductHolder] = useState([
        // this is the variable array used to hold all the form inputs
        // when new form input added new object is attached here
        {itemName :'' , itemQuantity:'' , showOther:false },
    
      ])

    // ------------- product section -------------





    const contextValue = {  test,settest ,
                            GotUserDetailsFlag , SetGotUserDetailsFlag,
                            updateAddress , userValues,
                            fetchUserDetails , 
                            
                            ProductHolder,
                            setProductHolder,

                         }    
    return(
        <AppContext.Provider value={contextValue} >
            {children}
        </AppContext.Provider>
    )
}  

