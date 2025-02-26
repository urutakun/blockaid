import React from 'react'
import { AnimatePresence, motion  } from 'motion/react'
import { useForm } from '@inertiajs/react'
import FormError from './FormError'

const EditData = ({ isEditClicked, setIsEditClicked, user, url}) => {
    const editUser = user && user;
    const { data, post, errors, setData } = useForm({
        _method: "PUT",
        'first_name': '',
        'middle_name': '',
        'last_name':  '',
        'email':  '',
        'mobile': '',
        'birthday': '',
        'password': '',
        'password_confirmation': ''
    })

    const handleSubmit = (e, id) => {
        e.preventDefault();

        post(`/${url}/edit/${id}`, {
            onSuccess: () => {
                setIsEditClicked(false);
                setTimeout(() => {
                    setData({
                        _method: "PUT",
                        first_name: '',
                        middle_name: '',
                        last_name: '',
                        email: '',
                        mobile: '',
                        birthday: '',
                        password: '',
                        password_confirmation: ''
                    });
                    window.location.reload();
                }, 300)
            },
            onError: (error) => console.log(error)
        })
    }

  return (
    <AnimatePresence mode='wait'>
        {isEditClicked && (
            <motion.div
            initial={{opacity: 0,}}
            animate={{opacity: 1, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
            exit={{opacity: 0}}
            className='fixed inset-0 bg-black/25 flex justify-center items-center' onClick={() => setIsEditClicked(false)}>
                <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                exit={{opacity: 0, y: 10}}
                className={`edit__container relative w-full h-full bg-cwhite md:w-[80vw] ${user?.role === 'beneficiary' ? 'md:h-[95vh]' : 'md:h-[60vh]'} lg:w-[40vw] md:rounded-xl flex flex-col justify-center`} onClick={(e) => e.stopPropagation()}>
                    <div className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsEditClicked(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </div>
                    <form className='mt-10 w-full px-[2rem] md:px-[6rem]'>
                        <p className='text-4xl md:text-2xl font-bold cheader'>Edit Data</p>
                        <div className='text-sm  text-red-500 mb-4 flex items-center space-x-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-500 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <p>Enter only the data you want to edit.</p>
                        </div>

                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="text" id="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder={editUser?.first_name || ''}/>
                            {errors.first_name && <FormError error={errors.first_name}/>}
                        </div>
                        {user?.role === 'beneficiary' && (
                            <>
                                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                                <input type="text" id="middle_name" value={data.middle_name} onChange={e => setData('middle_name', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder={editUser?.middle_name || ''}/>
                                {errors.middle_name && <FormError error={errors.middle_name}/>}
                            </div>
                            <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                                <input type="text" id="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder={editUser?.last_name || ''}/>
                                {errors.last_name && <FormError error={errors.last_name}/>}
                            </div>
                            </>
                        )}

                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="text" id="email" value={data.email} onChange={e => setData('email', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl' required={true} placeholder={editUser?.email || ''}/>
                            {errors.email && <FormError error={errors.email}/>}
                        </div>
                        {user?.role === 'beneficiary' && (
                            <>
                                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                                    <input type="text" id="mobile" value={data.mobile} onChange={e => setData('mobile', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder={editUser?.mobile || ''}/>
                                    {errors.mobile && <FormError error={errors.mobile}/>}
                                </div>
                                <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                                    <input type="date" id="birthday" value={data.birthday} onChange={e => setData('birthday', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true}/>
                                    {errors.birthday && <FormError error={errors.birthday}/>}
                                </div>
                            </>
                        )}
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="password" id="password" value={data.password} onChange={e => setData('password', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Password'/>
                            {errors.password && <FormError error={errors.password}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="password" id="password_confirmation" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder='Confirm Password'/>
                            {errors.password_confirmation && <FormError error={errors.password_confirmation}/>}
                        </div>
                        <div className="form-field flex flex-col items-center">
                            <input type="submit" value="Submit" className='px-32 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl' required={true} onClick={(e) => handleSubmit(e, user.id)}/>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default EditData
