import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData,setUserData]=useState({
    name:"edward vincent",
    image:assets.profile_pic,
    email:"richa@gmail.com",
    phone:'9999999999',
    address:"shdegdfuehfjhljfckndjk fjsdnljcfhuifcjndri",
    gender:"male",
    dob:"2000-02-20"
  })

  const [isEdit,setIsEdit]=useState(false)

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="" />
      {
        isEdit 
        ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e)=>setUserData(prev=>({...prev ,name:e.target.value}))} /> 
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Info:</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
          <p className='font-medium'> Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
        isEdit 
        ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={(e)=>setUserData(prev=>({...prev ,phone:e.target.value}))} /> 
        : <p className='text-blue-400'>{userData.phone}</p>
      }
      <p className='font-medium'>Address:</p>
      {
        isEdit 
        ? <p>
          <input className='font-medium bg-gray-100' type="text" value={userData.address} onChange={(e)=>setUserData(prev=>({...prev ,address:e.target.value}))}/>
        </p>
        : <p className='text-gray-500'>
          {userData.address}
        </p>
      }
      </div>
      <p className='text-neutral-500 underline mt-8'>BASIC INFORMATION:</p><br />
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5  text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {
        isEdit 
        ? <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e)=>setUserData(prev => ({...prev , gender:e.target.value}))}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p className='text-gray-400'>{userData.gender}</p>
      }
      <p className='font-medium'>BirthDate:</p>
      {
        isEdit 
        ? <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e)=>setUserData(prev=>({...prev ,dob:e.target.value}))}/>
        : <p className='text-gray-400'>{userData.dob}</p>
      }
      </div>
        
        
      </div>
      <div className='mt-10'>
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(false)}>Save Information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
      
    </div>
  )
}

export default MyProfile
