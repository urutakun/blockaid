import { useForm } from '@inertiajs/react'
import React from 'react'
import FormError from '../components/FormError';

const CreateAdmin = ({ setIsRegisterClicked }) => {
    const { data, setData, errors, post } = useForm({
        'first_name' : '',
        'email' : '',
        'password' : '',
        'password_confirmation': ''
    });

    const handleSubmit = () => {
        return;
    }

  return (
    <div className='fixed inset-0 bg-black/25 flex justify-center items-center' onClick={() => setIsRegisterClicked(false)}>
        <div className="edit__container relative w-full h-full bg-cwhite md:w-[80vw] md:h-[70vh] lg:w-[40vw] md:rounded-xl" onClick={(e) => e.stopPropagation()}>
            <div className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsRegisterClicked(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
            </div>
            <form className='mt-24 w-full px-[2rem] md:px-[6rem]'>
                <p className='text-2xl font-bold mb-10'>Register Admin</p>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="text" id="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Name'/>
                    {errors.first_name && <FormError error={errors.first_name}/>}
                </div>
                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                    <input type="text" id="email" value={data.email} onChange={e => setData('email', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Email'/>
                    {errors.email && <FormError error={errors.email}/>}
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
        </div>
    </div>
  )
}

export default CreateAdmin
