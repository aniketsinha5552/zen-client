import React from 'react'
import Themes from './Themes/Themes'
import { TextField } from '@mui/material'
import { newShade } from '../App'

export default function Footer() {
  return (
    <footer className="footer">
    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
      <Themes/>
    </div>
  </footer>
  )
}
