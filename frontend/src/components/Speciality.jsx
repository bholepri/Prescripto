import React from 'react'
import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
  return (
    <div id='speciality' className='my-20'>
      <h1 className='text-center text-3xl font-semibold mb-4'>Find by Speciality</h1>
      <p className='text-center mb-6'>Simply browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.</p>
      <div className='flex flex-col md:flex-row sm:flex-row flex-wrap  items-center justify-center gap-5 mt-10'>
       {specialityData.map((item, index )=>(
        <Link onClick={()=>scrollTo(0,0)} className='hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
          <img  src={item.image} alt="" />
            <p>{item.speciality}</p>
        </Link>
       ))}
      </div>
    </div>
  )
}

export default Speciality
