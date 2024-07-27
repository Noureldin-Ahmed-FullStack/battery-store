import { PaletteMode } from '@mui/material'
import React from 'react'
interface props {
    Theme: PaletteMode;
    children: React.ReactNode
}
export default function FancyDiv(props: props) {
    const { Theme ,children} = props
    return (
        <div>

            <img className='w-100' draggable={false} src={`https://ssniper.sirv.com/Images/other%20projects/fancy/pyramids${Theme == 'light' ? '2' : '4'}.png`} alt="" />
            {children}
            <img className='w-100' draggable={false} src={`https://ssniper.sirv.com/Images/other%20projects/fancy/pyramids${Theme == 'light' ? '1' : '3'}.png`} alt="" />

        </div>
    )
}
