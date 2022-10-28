import React from 'react'
import { Box, Container, 
 CircularProgress, Typography} from '@mui/material'
import ErrorComponent from '../component/ErrorComponent'
import CustomPagination from '../component/CustomPagination';
import SingleCard from '../component/SingleCard';
import SelectComponent from '../component/SelectComponent';
import Genre from '../genre/genre';







const Movie = () => {
  const [state, setState ] = React.useState({
    page: 1,
    content: [],
    status: 'idle',
    numberOfPages: ''
});

const {page, status, content , numberOfPages} = state
const [selectedGenres, setSelectedGenres] = React.useState([]);
const [genre , setGenre ] = React.useState('')

const fetchData = async () => {
    try {
        setState({...state, status: 'loading'})
       
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=[${genre}]`
      )

    const data = await res.json()
    setState({...state , status: 'success', content: data.results,  numberOfPages: data.total_pages})
   
    }

    catch (error) {
        setState({...state, status: 'rejected'})
    }
}


React.useEffect(() => {
window.scroll(0, 0);
fetchData();
// eslint-disable-next-line
}, [page, genre]);

return (
<Box>

<Container 
        sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >



           { status === "loading" && 
           <CircularProgress size={40}  sx={{margin: 10}} />
           
           }


{
            status === "success" && content &&
            <>
               <Genre
               selectedGenres = {selectedGenres}
               setSelectedGenres = {setSelectedGenres}
               type = {"movie"} />
              <Typography variant = "h4" component = "h1">
                Showing Movies
                </Typography>

              <Box sx ={{
                display: "grid",
                gridTemplateColumns: {sm :"1fr", md : "1fr 1fr " ,lg : "1fr 1fr 1fr"},
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
                        type = {"movie"}
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
</Box>
)
}

export default Movie