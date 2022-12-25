import React from 'react'
import {Stack , Typography, Button } from "@mui/material"

const ErrorComponent = ({fetchData}) => {
  return (
    <>
          <Stack 
          textAlign = "center" 
           m={10} 
           sx={{gap: 7, position: "relative"}}>
                   <Typography color ={"text.primary"}component= "h1" variant = "h3">
                    Oops an Error Occured 
                </Typography> 
                <Button 
                sx={{width: "200px", margin: "0 auto"}}
                onClick = {fetchData}
                variant = "outlined">
                    Try Again
                </Button>
         </Stack>
    </>   
  )
}

export default ErrorComponent