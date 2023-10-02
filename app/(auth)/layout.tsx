import React from 'react'

type Props = {
    children:React.ReactNode
}

const AuthLayout = (props: Props) => {
  return (
    <div className='flex items-center justify-center h-full'>
        {props.children}
    </div>
  )
}

export default AuthLayout