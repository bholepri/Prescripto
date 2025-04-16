import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const currencySymbol='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [records,setRecords]=useState([])
    const [token ,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData,setUserData] =useState(false)
    const [reviews ,setReviews] = useState([])
    const [appointments ,setAppointments] = useState([])
    

    const getDoctorsData = async ()=>{
        try {
            const {data} =await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const loadUserProfileData = async ()=>{
        try {

            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const saveRecords = async ()=>{
        try {

            const {data} = await axios.get(backendUrl + '/api/user/save-records',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getRecords =async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-records',{headers:{token}})
           
            if(data.success){
                setRecords(data.records)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getReviewsData = async ()=>{
        try {
            const {data} =await axios.get(backendUrl + '/api/user/all-review')
            // console.log(data)
            if(data.success){
                setReviews(data.reviews)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getAppointmentsData = async ()=>{
        try {
            const {data} =await axios.get(backendUrl + '/api/admin/appointments')
            
            if(data.success){
                setAppointments(data.appointments)
                // console.log(appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const value ={
        doctors ,getDoctorsData,
        currencySymbol,token,setToken,
        backendUrl,userData,setUserData,
        loadUserProfileData,saveRecords,
        records,setRecords,getRecords,
        reviews,setReviews,
        getReviewsData,
        appointments,setAppointments,
        getAppointmentsData
    }

    useEffect(()=>{
        getDoctorsData(),
        getRecords(),
        getReviewsData(),
        getAppointmentsData()
    },[])

    useEffect(()=>{
       if(token){
        loadUserProfileData()
       }else{
        setUserData(false)
       }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider