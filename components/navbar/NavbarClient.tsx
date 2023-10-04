import React from 'react'
import MainNav from './MainNav'
import StoreDropDown from '../store-dropdown'
import StoreSwitcherApi from '../api/store-switcher-api'

type Props = {}

const NavbarClient = (props: Props) => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    <StoreDropDown />
                </div>
            </div>
        </div>
    )
}

export default NavbarClient