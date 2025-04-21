import { useForm } from '@inertiajs/react'
import React from 'react'

const Contact = () => {
    const { data, setData, errors, post } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
    });
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='font-font1Smbd text-6xl md:text-6xl lg:text-8xl'>CONTACT US</h1>
        <form action="#" className='mt-16 w-full md:w-[50vw] px-4'>
                <div className="name grid grid-cols-4 md:gap-1 lg:gap-4 mb-6">
                    <div className="form-field flex flex-col col-span-4 lg:col-span-2 mb-6 lg:mb-0">
                        <input type="text" id="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl capitalize' required={true} placeholder='First Name'/>
                        {errors.first_name && <FormError error={errors.first_name}/>}
                    </div>
                    <div className="form-field flex flex-col col-span-4 lg:col-span-2">
                        <input type="text" id="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl capitalize' required={true} placeholder='Last Name'/>
                        {errors.last_name && <FormError error={errors.last_name}/>}
                    </div>
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="email" id="email" value={data.email} onChange={e => setData('email', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder='Email'/>
                    {errors.email && <FormError error={errors.email}/>}
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <textarea value={data.message} onChange={e => setData('message', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl h-[200px] resize-none' required={true} placeholder='Your message'></textarea>
                    {errors.message && <FormError error={errors.message}/>}
                </div>

                <div className="form-field flex flex-col items-center mt-12">
                    <input type="submit" value="Submit" className='px-20 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl' required={true} onClick={(e) => handleSubmit(e)}/>
                </div>
            </form>
    </div>
  )
}

export default Contact
