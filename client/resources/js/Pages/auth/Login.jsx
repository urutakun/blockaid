import { useForm } from '@inertiajs/react'
import React from 'react'
import FormError from '../components/FormError'
import Logo from '../components/Logo'
import HeroSlide from '../components/HeroSlide'

const Register = () => {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    }

  return (
    <div className='grid grid-cols-2 w-full h-screen'>
        <div className="hero__image hidden md:block bg-cblack">
            {/* <div className="image__wrapper overflow-hidden h-full">
                <img src="/splide__images/4.png" alt="" className='w-full h-full object-cover'/>
            </div> */}
            <HeroSlide />
        </div>
        <div className="register__form h-screen flex justify-center items-center flex-col col-span-2 md:col-span-1">
            <Logo color='light'/>
            <h1 className='text-5xl lg:text-6xl md:4xl font-bold font-font1Smbd mt-16'>Welcome Back!</h1>
            <div className="blockaid__description text-center lg:mx-40 md:mx-38 mx-20 mt-8">
                <p>BlockAid tracks relief with blockchain, ensuring transparent and efficient aid distribution.</p>
            </div>
            <form action="#" className='mt-16 w-full px-[2rem] md:px-[6rem]'>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="email" id="email" value={data.email} onChange={e => setData('email', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder='Email'/>
                    {errors.email && <FormError error={errors.email}/>}
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="password" id="password" value={data.password} onChange={e => setData('password', e.target.value)} className='bg-transparent border border-cblack rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder='Password'/>
                    {errors.password && <FormError error={errors.password}/>}
                </div>

                <div className="form-field flex flex-col items-center mt-16">
                    <input type="submit" value="Login" className='px-32 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl' required={true} onClick={(e) => handleSubmit(e)}/>
                    <div className='flex items-center text-base mt-4'>Don't have an account yet? <a href="/register" className='ml-2 underline text-cgreen'>Register</a></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register
