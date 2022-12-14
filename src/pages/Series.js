import React from 'react'
import { Container, 
    CircularProgress, Box, Typography} from "@mui/material"
import ErrorComponent from '../component/ErrorComponent';
import CustomPagination from '../component/Pagination/CustomPagination';
import SingleCard from '../component/SingleCard';
import Genre from '../genre/genre';

const Series = () => { const [state, setState ] = React.useState({
    page: 1,
    content: [],
    status: 'idle',
    numberOfPages: ''
});

const {page, status, content , numberOfPages} = state
const [selectedGenres, setSelectedGenres] = React.useState([]);
const [genre , setGenre ] = React.useState([])
const [urlGenre, setUrlGenre] = React.useState('') 

React.useEffect(()=>{
  const ids = genre.length !== 0 ? genre.map((item)=>{
    return item.id
  }):''

  setUrlGenre(ids.toString())
  setState({...state , page: 1})
}, [genre])

const fetchData = async () => {
  
        try {
            setState({...state, status: 'loading'})
        const res = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${urlGenre}`
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
<div>
<Container 
        sx={{
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"}} >

              <Genre
               selectedGenres = {selectedGenres}
               setSelectedGenres = {setSelectedGenres}
               setGenre = {setGenre}
               type = {"movie"} />


           { status === "loading" && 
           <CircularProgress 
           size={40}  
           sx={{margin: 10}} />
           
           }
           {
            status === "success" && content &&
            <>
              <Typography variant = "h4" component = "h1">
                Showing Series
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
                        type = {"series"}
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

export default Series