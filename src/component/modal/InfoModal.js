import React from 'react'
import ErrorComponent from '../ErrorComponent'
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
        sx={{overflow: "scroll", height: "100%"}}
      >
        <Box
        bgColor = {"primary"}
        
        sx ={{
          display: "flex", 
          overflow: "scroll", 
          alignItems: 'center',
           justifyContent: "center"
            }}
        
        >


        
        {
            
          state.status = "loading" && !content &&  <CircularProgress />
          }  


          {
            state.status = "success" &&
             <Item 
             type = {type} 
             id = {id} 
             content = {content}
             video ={video}
             setOpen ={setOpen}
             />
          }
   
        {
            
            state.status = "rejected" &&  !content &&  <ErrorComponent fetchData={fetchData} />
            }  
  
        
         
        </Box>
      </Modal>
    </>
  )
}

export default InfoModal