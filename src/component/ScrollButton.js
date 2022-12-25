import React, {useState} from 'react';
import { Button } from '@mui/material';
import {ArrowUpwardTwoTone} from "@mui/icons-material";

const ScrollButton = () =>{

const [visible, setVisible] = useState(false)

const toggleVisible = () => {
   
	const scrolled = document.documentElement.scrollTop;
    
	if (scrolled > 300){
	setVisible(true)
	}
	else if (scrolled <= 300){
	setVisible(false)
	}
};



const scrollToTop = () =>{
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	/* you can also use 'auto' behaviour
		in place of 'smooth' */
	});
    
};

React.useEffect(()=>{
    window.addEventListener('scroll', toggleVisible);
    
    return () => {
        window.removeEventListener('scroll',  toggleVisible)
       }
}, [])



return (
    <>
	<Button 
    onClick={scrollToTop}
    color = {"success"}
    variant = {"contained"}
    sx ={{
      position: "sticky",
      left: "80%",
      top: "10%",
      transfrom: "translate(-60%)",
      width: "20px",
      borderRadius: "10px",
      display: visible ? 'inline' : 'none'

    
    }}
	
    >
        <ArrowUpwardTwoTone
        sx={{
            color: "white",
           
        }}
        /></Button>
   
    </>

);
}

export default ScrollButton;
