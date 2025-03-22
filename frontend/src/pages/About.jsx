import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div >
      <p className='text-center text-2xl pt-10 text-gray-500'>ABOUT US</p>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
        <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
        <p className='text-gray-800 font-semibold'>Our Vision</p>
        <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
      </div>
      </div>
      <p className='text-2xl'>WHY CHOOSE US</p>
      <div className='flex flex-col md:flex-row sm:flex-col text-gray-700 mt-10'>
        <div className='border border-gray-100  p-16  hover:bg-primary hover:text-white'>
          <b>EFFICIENCY:</b>
          <p className='mt-4' >Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border border-gray-100 p-16  hover:bg-primary hover:text-white'>
          <b>CONVENIENCE:</b>
          <p className='mt-4' >Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border border-gray-100 p-16  hover:bg-primary hover:text-white '>
          <b>PERSONALIZATION:</b>
          <p className='mt-4'> Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
