import React from 'react'
import Themes from './components/Themes/Themes'
import { TextField } from '@mui/material'
import { newShade } from './App'

export default function Footer({setThemes,theme}) {
  return (
    <footer className="footer">
    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
      <Themes setThemes={setThemes} theme={theme}/>
    </div>
  </footer>
  )
}
