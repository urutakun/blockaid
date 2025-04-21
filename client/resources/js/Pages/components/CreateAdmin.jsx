import { useForm, usePage } from '@inertiajs/react'
import React from 'react'
import FormError from '../components/FormError';
import { AnimatePresence, motion } from 'motion/react';
import { reset } from 'laravel-mix/src/Log';

const CreateAdmin = ({ isRegisterClicked, setIsRegisterClicked }) => {
    const { data, setData, errors, post } = useForm({
        first_name : '',
        last_name : '',
        email : '',
        role: '',
        password : '',
        password_confirmation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/register', {
            onSuccess: () => {
                setIsRegisterClicked(false)
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            },
        });
    }

  return (
    <AnimatePresence mode='wait'>
        {isRegisterClicked && (
            <motion.div
            initial={{opacity: 0,}}
            animate={{opacity: 1, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
            exit={{opacity: 0}}
            className='fixed inset-0 bg-black/25 flex justify-center items-center' onClick={() => setIsRegisterClicked(false)}>
                <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                exit={{opacity: 0, y: 10}}
                className="edit__container relative w-full h-full bg-cwhite md:w-[80vw] md:h-[80vh] lg:w-[40vw] md:rounded-xl flex flex-col justify-center" onClick={(e) => e.stopPropagation()}>
                    <div className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsRegisterClicked(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </div>
                    <form className='mt-16 w-full px-[2rem] md:px-[6rem]'>
                        <p className='text-4xl md:text-2xl font-bold mb-10 cheader'>Register Admin</p>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="text" id="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='First Name'/>
                            {errors.first_name && <FormError error={errors.first_name}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="text" id="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Last Name'/>
                            {errors.last_name && <FormError error={errors.last_name}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="text" id="email" value={data.email} onChange={e => setData('email', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Email'/>
                            {errors.email && <FormError error={errors.email}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <select name="role" id="role" required={true} value={data.role} onChange={e => setData('role', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' >
                                <option value=''>Please Select Role</option>
                                <option value='dswd'>DSWD</option>
                                <option value='bdrrm'>BDRRM</option>
                            </select>
                            {errors.role && <FormError error={errors.role}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="password" id="password" value={data.password} onChange={e => setData('password', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Password'/>
                            {errors.password && <FormError error={errors.password}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="password" id="password_confirmation" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Confirm Password'/>
                            {errors.password_confirmation && <FormError error={errors.password_confirmation}/>}
                        </div>
                        <div className="form-field flex flex-col items-center">
                            <input type="submit" value="Submit" className='px-32 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl' required={true} onClick={(e) => handleSubmit(e)}/>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default CreateAdmin
