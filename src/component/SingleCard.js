import React from 'react';
import { Paper , Typography , Rating , Button}from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoModal from './modal/InfoModal';


const SingleCard = ({
    title, rating, img, info, right, type, original_title, id}) => {
    const img_main = "https://image.tmdb.org/t/p/w300";
   

    const [ open , setOpen ] = React.useState(false)
    const handleOpen = ()=>{
        setOpen(true)
    }


  return (
    <Paper 
    id = {id} 
    className = { right ? "paper-right" : '' }
    sx={{
        padding: 3,
        marginTop: 2,
        maxWidth: "300px",

    }}
    elevation = {3}
    >
        <img 
       loading = "lazy"
        src={`${img_main}${img}`}  
        alt = {title}
        />

        <Typography variant = {right ? "h5" : "h2"} component = "h2">
            {title || original_title || "Title Not found"}
        </Typography>

        {!right &&
        <Typography variant = "h6" component = "p">
            {info || 'Content Not Found'}
        </Typography>}

        <Rating
        name = "read-only"
        value = {(rating / 2) || 0 }
        />

        <div>
        <Button
        sx ={{textTransfrom : "capitalize"}}
        endIcon = {< OpenInNewIcon  />}
        onClick = {handleOpen}
        > Read more</Button>
        </div>

        { open && 
        <InfoModal 
        type = {type}
        id = {id}
        open = {open}
        setOpen = {setOpen}
    
        />}
    </Paper>
  )
}

export default SingleCard