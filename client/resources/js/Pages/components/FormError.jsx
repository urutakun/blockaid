import React from 'react'

const FormError = ({ error }) => {
  return (
    <div className='text-red-500 italic text-sm'>
        {error}
    </div>
  )
}

export default FormError
