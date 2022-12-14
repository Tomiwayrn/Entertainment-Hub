import React from 'react'
import { Box, Typography, CircularProgress } from "@mui/material";
import SingleCard from '../SingleCard';
import ErrorComponent from '../ErrorComponent';
import Carousel from 'react-material-ui-carousel'

const Rightbar = () => {


  const [state, setState ] = React.useState({
    content: [],
    status: 'idle'
});

const  { status, content } = state

  const fetchData = async () => {
    try {
        setState({page: 1 , status: 'loading'})
        console.log(state)
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=3842489d75e2a53ce00e397d886b2d90&page=1`
      )

      
    const data = await res.json()
    setState({...state , status: 'success', content: data.results.slice(0,3)})
    
    }

    catch (error) {
        setState({status: 'rejected'})
    }
}

React.useEffect(() => {

  fetchData();
  // eslint-disable-next-line
}, []);


  return (
    <Box 
        bgcolor={"background.default"} 
        color = {"text.primary"} 
        flex = {1} 
        p ={2}
        sx={{display: {xs: "none", md : "block"}, boxShadow: 2}}>
      <Box  >

            <Typography variant = "h4" component = "h1">
              Trending This week
              </Typography>

              { status === "loading" && 
               <CircularProgress size={40}  sx={{margin: 10}} />
           
               }


              {
                status === "success" && content &&
                <Box 
              
                
                >
                  
                <Carousel sx={{width: "100%", padding: 0}}>
                    {
                      content.map((item)=>{
                        return(
                          <SingleCard
                          key = {item.id}
                          id = {item.id}
                          title = { item.title}
                          img = {item.poster_path}
                          info = {item.overview}
                          rating= {item.vote_average}
                          original_title = {item.original_title}
                          right = {true}
                          />
                        )
                      })
                    }

        </Carousel>

                  </Box>

              }



              {
              status === "rejected" && 
              <ErrorComponent fetchData = {fetchData} />
              }
            
     
          
        </Box>
    </Box>
    
  )
}

export default Rightbar