import React from 'react'
import { AppBar, Switch, Toolbar, Typography, Box }  from '@mui/material'


const Navbar = ({mode , setMode}) => {


    const handleClick = ()=> {
      setMode( mode === "light" ? "dark" : "light")
    }

   
  
    
  return (
    <>
        <AppBar position='sticky' >
            <Toolbar sx={{display: "flex", width: "100%", justifyContent: 'space-between'}}>
               <Typography 
             
               component= "h1" variant = "h5"> 
                MOVIES WEBAPP
               </Typography>

              
                            
              <Box  sx={{display: {xs: "block", md : "none"}}}>
               <Switch
                sx={{marginRight: '20px'}}
                checked = {
                    mode === "light" ? false 
                : true}
               color = "primary" size = 'large' onClick = {handleClick}/>
               </Box>
            </Toolbar>
            

        </AppBar>
    </>
  )
}

export default Navbar
