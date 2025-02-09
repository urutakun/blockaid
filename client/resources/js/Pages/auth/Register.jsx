import { useForm } from '@inertiajs/react'
import React from 'react'
import FormError from '../components/FormError'
import Logo from '../components/Logo'

const Register = () => {
    const { data, setData, post, errors } = useForm({
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        mobile: '',
        birthday: '',
        password: '',
        password_confirmation: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    }

  return (
    <div className='grid grid-cols-2 w-full h-screen'>
        <div className="hero__image hidden md:block">
            <div className="image__wrapper overflow-hidden h-full">
                <img src="/image.jpg" alt="" className='w-full h-full object-cover'/>
            </div>
        </div>
        <div className="register__form h-screen flex justify-center items-center flex-col col-span-2 md:col-span-1 pt-20 lg:pt-0 overflow-auto cscrollbar">
            <Logo size={150}/>
            <h1 className='text-5xl lg:text-6xl md:4xl font-bold font-font1Smbd'>Create an account</h1>
            <form action="#" className='mt-16 w-full px-[2rem] md:px-[6rem]'>
                <div className="name grid grid-cols-6 md:gap-1 lg:gap-4 mb-6">
                    <div className="form-field flex flex-col col-span-6 md:col-span-3 lg:col-span-2 mb-6 lg:mb-0">
                        <input type="text" id="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl capitalize' required={true} placeholder='First Name'/>
                        {errors.first_name && <FormError error={errors.first_name}/>}
                    </div>
                    <div className="form-field flex flex-col col-span-6 md:col-span-3 lg:col-span-2 mb-6 lg:mb-0">
                        <input type="text" id="middle_name" value={data.middle_name} onChange={e => setData('middle_name', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl capitalize' required={true} placeholder='Middle Name'/>
                        {errors.middle_name && <FormError error={errors.middle_name}/>}
                    </div>
                    <div className="form-field flex flex-col col-span-6 lg:col-span-2">
                        <input type="text" id="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl capitalize' required={true} placeholder='Last Name'/>
                        {errors.last_name && <FormError error={errors.last_name}/>}
                    </div>
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="email" id="email" value={data.email} onChange={e => setData('email', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder='Email'/>
                    {errors.email && <FormError error={errors.email}/>}
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="text" id="mobile" value={data.mobile} onChange={e => setData('mobile', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder='Mobile'/>
                    {errors.mobile && <FormError error={errors.mobile}/>}
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="date" id="birthday" value={data.birthday} onChange={e => setData('birthday', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl' required={true}/>
                    {errors.birthday && <FormError error={errors.birthday}/>}
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="password" id="password" value={data.password} onChange={e => setData('password', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder='Password'/>
                    {errors.password && <FormError error={errors.password}/>}
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-8">
                    <input type="password" id="password_confirmation" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder='Confirm Password'/>
                    {errors.password_confirmation && <FormError error={errors.password_confirmation}/>}
                </div>
                <div className="form-field flex flex-col items-center mt-16 mb-8">
                    <input type="submit" value="Register" className='px-32 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl' required={true} onClick={(e) => handleSubmit(e)}/>
                    <div className='flex items-center text-base mt-4'>Already have an account? <a href="/login" className='ml-2 underline text-cgreen'>Login</a></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register
