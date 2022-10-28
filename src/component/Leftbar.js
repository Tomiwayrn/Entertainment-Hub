import React from 'react'
import { 
    Box, Switch 

} from '@mui/material'

import BottomNav from './BottomNav'
import { Stack } from '@mui/system'

const Leftbar = ({  setMode, mode}) => {

   

    const handleClick = () => {
        setMode( mode === "light" ? "dark" : "light")
    }

    const sx ={
        display: 'flex',
        flexDirection: 'column',
        gap:'20px',
        marginTop: '-10rem'
    }

    const sxItem = {
        flexDirection: 'row',
        gap: '20px',
        fontSize: '50px',
        size: 'large'
    }

  return (
    <Box
     flex = {"1fr"}
    sx = {{
        display: {xs: "none", md : "flex"
        },
        height: "100vh",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 2
    }}
        position="relative"

    >


        <BottomNav sx={sx} sxItem = {sxItem} />

            <Stack 
             sx={{marginTop: "5rem", flexDirection: 'row',  alignItems: 'center', justifyContent: 'center'}}>
              
                <Switch 
                checked = {
                    mode === "light" ? false 
                : true}
                onChange={ () =>  handleClick()} />
                
            </Stack>
            


   

       
        
    </Box>
    
  )
}

export default Leftbar