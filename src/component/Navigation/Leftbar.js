import React from 'react';
import { 
    Box, Switch 

} from '@mui/material';

import BottomNav from './BottomNav';
import { Stack } from '@mui/system';

const Leftbar = ({  setMode, mode}) => {

   

    const handleClick = () => {
        setMode( mode === "light" ? "dark" : "light")
    };

  
  return (
    <Box
     flex = {""}
     className = "left-bar"
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


        <BottomNav />

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

export default Leftbar;
