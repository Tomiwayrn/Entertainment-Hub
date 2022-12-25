import React from 'react';
import {Modal , Box,  CircularProgress} from '@mui/material';
import Item from './Item';


const InfoModal = ({open , setOpen, type, id}) => {


 
  const [state, setState ] = React.useState({
    status: "idle",
    content: "",
    

  })

  const [video , setVideo] = React.useState('')

  const content  = state.content
 

  // const { status, content , video} = state
  const handleClose = ()=>{
    setOpen(false)
  }

  const fetchData =async ()=>{
    try {

     
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

        const data = await res.json()
        setState({...state, content: data, status: "success"})
       

    }

    catch(error) {
      setState({...state, status: "rejected"})
    }

  }

  const fetchVideo = async()=>{
    try {

      setState({...state, status: "loading"})
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        const data = await res.json()
        setVideo(data)
       
     
       

    }

    catch(error) {
     console.log(error)
    }
  }


  React.useEffect(()=>{
    fetchData()
    fetchVideo()
  }, [])




  return (
    <>
   
      <Modal
        open= {open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{overflow: "scroll", height: "100%", width: "100%" }}
      >

        <Box
        
        sx ={{
          display: "flex", 
          overflow: "scroll", 
          alignItems: 'center',
           justifyContent: "center",
           height: "100%", width: "100%" , position: "relative"
        
            }}
        >
{
            
            state.status === "lodaing" & !content &&  <CircularProgress />
            }  
  
      


        

          {
            state.status = "success" &&
            <Box
            bgColor = {"primary"}
            sx={{width: "100%",height: "a"}}
            
            >
             <Item 
             type = {type} 
             id = {id} 
             content = {content}
             video ={video}
             setOpen ={setOpen}
             />

        </Box>
          }
   

         
        </Box>
      </Modal>
    </>
  )
}

export default InfoModal