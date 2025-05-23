import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import FormError from './FormError';
import { motion, AnimatePresence } from "motion/react";

const Edit = ( { isEditClicked, setIsEditClicked, user } ) => {

    const { data, setData, post, errors } = useForm({
        'first_name': '',
        'middle_name': '',
        'last_name': '',
        'birthday': '',
        'mobile': '',
        'image': null
    })


    const [fileName, setFileName] = useState("");

    if(isEditClicked){
        document.body.classList.add('overflow-hidden');
    }
    else{
        document.body.classList.remove('overflow-hidden');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('first_name', data.middle_name);
        formData.append('last_name', data.last_name);
        formData.append('birthday', data.birthday);
        formData.append('mobile', data.mobile);
        formData.append('image', data.image);

        post('/profile/edit', {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onSuccess: () => {
                setIsEditClicked(false);
                setTimeout(() => {
                    setData({
                        first_name: '',
                        middle_name: '',
                        last_name: '',
                        email: '',
                        mobile: '',
                        birthday: '',
                        image: null
                    })
                }, 2000)
            }
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setData('image', file);
            setFileName(file.name);
        }
        else{
            setFileName("");
        }
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
                className={`edit__container relative w-full h-full bg-cwhite md:w-[80vw] ${user.role === 'beneficiary' ? 'md:h-[90vh]' : 'md:h-[50vh]'} lg:w-[40vw]  md:rounded-xl flex flex-col justify-center`} onClick={(e) => e.stopPropagation()}>
                    <div className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsEditClicked(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </div>
                    <form className='mt-16 w-full px-[2rem] md:px-[6rem]'>
                        <p className='text-3xl md:text-2xl font-bold cheader'>Edit Profile</p>
                        <div className='text-sm  text-red-500 mb-4 flex items-center space-x-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-500 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <p>Enter only the data you want to edit.</p>
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="file" id="image" onChange={(e) => handleFileChange(e)} className='hidden' required={true}/>
                            <label htmlFor="image" className='border border-dashed border-cblack rounded-lg h-[8rem] flex justify-center items-center flex-col'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-500 size-6 md:size-10 text-cblue">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <p className='text-lg md:text-xl text-gray-500'>{fileName ? fileName : 'Upload Profile Picture'}</p>
                                {errors.image && <FormError error={errors.image}/>}
                            </label>
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="text" id="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder={user.first_name}/>
                            {errors.first_name && <FormError error={errors.first_name}/>}
                        </div>
                        { user.role === 'beneficiary' && (
                        <>
                            <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                                <input type="text" id="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} className={`bg-transparent border ${user.middle_name == null ? 'border-cgray' : 'border-black'} rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize`} required={true} placeholder={user.last_name}/>
                                {errors.last_name && <FormError error={errors.last_name}/>}
                            </div>
                            <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                                <input type="date" id="birthday" value={data.birthday} onChange={e => setData('birthday', e.target.value)} className={`bg-transparent border ${user.middle_name == null ? 'border-cgray' : 'border-black'} rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize`} required={true} placeholder={user.birthday}/>
                                {errors.birthday && <FormError error={errors.birthday}/>}
                            </div>
                            <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                                <input type="text" id="mobile" value={data.mobile} onChange={e => setData('mobile', e.target.value)} className={`bg-transparent border ${user.middle_name == null ? 'border-cgray' : 'border-black'} rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize`} required={true} placeholder={user.mobile} disabled={user.middle_name == null ? true : false}/>
                                {errors.mobile && <FormError error={errors.mobile}/>}
                            </div>
                        </>
                        )}
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

export default Edit
