import React, { useEffect, useState }from 'react'
import { motion, AnimatePresence} from "motion/react"
import { baseURL } from '../configs/config';
import { useForm } from '@inertiajs/react';

const DeleteModal = ({ isDeleteClicked, setIsDeleteClicked, user, url}) => {
    const [fullName, setFullName] = useState("");
    const {delete: destroy} = useForm();

    useEffect(() => {
        if(user){
            const full_name = `${user.first_name} ${user.last_name !== null ? user.last_name  : ''}`;
            setFullName(full_name);
        }

    }, [user])

    const handleDelete = async (id) => {
        destroy(`${baseURL}/${url}/delete/${id}`, {
            preserveScroll: true,
            onSuccess: () => setIsDeleteClicked(false),
            onError: (errors) => console.error("Delete failed:", errors),
        })
    }

    return (
      <AnimatePresence mode='wait'>
        {isDeleteClicked && (
            <motion.div
            initial={{opacity: 0,}}
            animate={{opacity: 1, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
            exit={{opacity: 0}}
            className='fixed z-5 inset-0 bg-black/50 flex justify-center items-center' onClick={() => setIsDeleteClicked(false)}>
                <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                exit={{opacity: 0, y: 10}}
                className="modal__content-wrapper bg-cwhite w-[400px] h-[300px] lg:w-[500px] lg:h-[350px] rounded-xl p-2 lg:p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="content">
                        <div className="delete__warning flex justify-center flex-col items-center mt-4">
                            <div className="delete__icon bg-red-500 text-cwhite w-fit p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 lg:size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            <p className='font-bold text-2xl lg:text-3xl mt-4'>Delete Record</p>
                        </div>
                        <div className="delete__body text-center text-base lg:text-xl mt-8">
                            <p>You are about to delete <span className='font-bold'>{ fullName }'s</span> record</p>
                            <p>Do you wish to continue?</p>
                        </div>
                        <div className="delete__footer flex justify-center items-center space-x-6 mt-10 text-cwhite">
                            <button className='w-[150px] lg:w-[200px] text-base lg:text-xl py-2 lg:py-3 bg-gray-400 hover:bg-gray-500 ctransition rounded-lg lg:rounded-xl' onClick={() => setIsDeleteClicked(false)}>Cancel</button>
                            <button className='w-[150px] lg:w-[200px] text-base lg:text-xl py-2 lg:py-3 bg-red-500 hover:bg-red-600 ctransition rounded-lg lg:rounded-xl' onClick={() => handleDelete(user.id)}>Yes, Delete</button>
                        </div>
                    </div>
                </motion.div>
        </motion.div>
        )}
    </AnimatePresence>
  )
}

export default DeleteModal
