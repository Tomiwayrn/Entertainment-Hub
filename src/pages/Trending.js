
import React from 'react';
import { Container, 
    CircularProgress, Box, Typography} from "@mui/material";
import { Whatshot } from '@mui/icons-material';
import ErrorComponent from '../component/ErrorComponent';
import CustomPagination from '../component/Pagination/CustomPagination';
import SingleCard from '../component/SingleCard';
import SelectComponent from '../genre/SelectComponent';




const Trending = () => {
 
  
    const [state, setState ] = React.useState({
        page: 1,
        content: [],
        status: 'idle', 
        numberOfPages: ''
    });

    const [ genre , setGenre ] = React.useState('')

    
    const  {page , status, content,  numberOfPages } = state
   
    const fetchData = async () => {
        try {
            setState({...state, status: 'loading'})
          
        const res = await fetch(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genre}`
          )

       
        const data = await res.json()
        setState({...state , status: 'success', content: data.results,  numberOfPages: data.total_pages})
      
        }

        catch (error) {
            setState({status: 'rejected'})
        }
    }

    
  React.useEffect(() => {
    window.scroll(0, 0);
    fetchData();
    // eslint-disable-next-line
  }, [page, genre]);



    
  return (
    <div>
         <Container 
        sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
          <SelectComponent 
          setGenre = {setGenre}
          />

           { status === "loading" && 
           <CircularProgress size={40}  sx={{margin: 10}} />
           
           }


           {
            status === "success" && content &&
            <>

           
            <Typography 
            margin = {1}
            variant = "h5" component = "p">
              Trending 
              <Whatshot
              color = {'error'}
               /> 
               <Whatshot
              color = {'error'}
               /> 
              </Typography>

           
              <Box sx ={{
                display: "grid",
                gridTemplateColumns: {xs:"1fr", sm :"1fr 1fr"  ,lg : "1fr 1fr 1fr"},
                gap: "20px"
              }}>
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
                      type = {item.media_type}
                      />
                    )
                  })
                }
            </Box>
          </>
           }



    {numberOfPages > 1 && <CustomPagination setState = {setState} state = {state}/> }

        {
            status === "rejected" && 
            <ErrorComponent fetchData = {fetchData} />
            }
            
        </Container>
    </div>
  )
}

export default Trending