import { useForm } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import FormError from '../components/FormError'
import Logo from '../components/Logo'
import HeroSlide from '../components/HeroSlide'
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const { data, setData, post, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        birthday: '',
        password: '',
        password_confirmation: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            onError: (error) => {
                if(error.error){
                    console.log(error.error);
                    toast.error(error.error);
                }
            },
            onSuccess: () => {
                toast.success("Registration Successful");
            }
        });
    }



  return (
    <div className='grid grid-cols-2 w-full h-screen'>
        <div className="hero__image hidden lg:block bg-cblack">
            <HeroSlide />
        </div>
        <div className="register__form relative h-screen flex justify-center items-center flex-col col-span-2 md:col-span-1 pt-20 lg:pt-0 overflow-auto cscrollbar">
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="colored"
            className="text-sm"
            />
            <Logo color='light'/>
            <h1 className='text-4xl lg:text-5xl md:4xl font-bold font-font1Smbd mt-8 lg:mt-6'>Create an account</h1>
            <form action="#" className='mt-8 w-full px-[2rem] md:px-[6rem]'>
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
                <div className="form-field flex flex-col items-center mt-8 mb-8">
                    <input type="submit" value="Register" className='px-20 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl' required={true} onClick={(e) => handleSubmit(e)}/>
                    <div className='flex items-center text-sm lg:text-base mt-4'>Already have an account? <a href="/login" className='ml-2 underline text-cgreen'>Login</a></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register
