import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider =(props)=>{

   const currency = '$'

   const calculateAge = (dob)=>{
       const today =new Date()
       const birthdate = new Date(dob)

       const age =today.getFullYear() - birthdate.getFullYear()
       return age
   }

   const value={
      calculateAge,
      currency
   }

   return (
    <AppContext.Provider value={value}>
    {props.children}
    </AppContext.Provider>
   )
}

export default AppContextProvider