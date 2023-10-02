'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Logo from "@/assets/logo.png";
import CartImage from "@/assets/cartIcon.png";
import { HiOutlineSearch } from 'react-icons/hi';
import { BiCaretDown } from 'react-icons/bi';
import { UserButton } from '@clerk/nextjs';
type HeaderProps = {}

function Header({ }: HeaderProps) {
    return (
        <div className="w-full h-20 bg-amazon_blue text-white stick top-0 z-50">
            <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:-grap-3 px-4">
                <Link href={"/"}>
                    <div className=" px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
                        <Image src={Logo} alt="logoImg" className=" w-28 object-cover mt-1 "/>
                    </div>
                </Link>
                {/* delivery */}
                <div className='px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justiry-center h-[70%] gap-1'>
                    <div className="text-xs">
                        <p>Deliver to</p>
                        <p className='text-white font-bold uppercase'>USA</p>
                    </div>
                </div>
                {/* searchbar */}
                <div className=" flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
                    <input type="text" className='w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow' />
                    <span className='w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md'>
                        <HiOutlineSearch />
                    </span>
                </div>
                {/* signin */}
                <div className='text-xs text-gray-100 flex flex-col justify-center  px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] '>
                    <UserButton/>
                </div>
                {/* favorite */}
                <div
                    className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
                    <p>Marked</p>
                    <p className='
                    text-white
                    font-bold'> & Fovarite</p>
                </div>

                {/* cart */}
                <Link href={"cart"}
                    className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
                    <Image src={CartImage}
                        className=' w-auto object-cover h-8'
                        alt='cartImage' />
                    <p className=' text-xs text-white font-bold mt-3'> Cart</p>
                    <span className="absolute text-amazon_yellow text-xs top-2 left-[29px] font-semibold">
                        0
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Header