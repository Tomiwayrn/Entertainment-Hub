import React from 'react'
import { Box, Button , Stack,
     TextField, Tabs , Tab, Container, 
    Typography, CircularProgress} from '@mui/material'
import  SearchOutlined  from '@mui/icons-material/SearchOutlined'
import ErrorComponent from '../component/ErrorComponent';
import CustomPagination from '../component/Pagination/CustomPagination';
import SingleCard from '../component/SingleCard';

const Search = () => {
    const [value, setValue ] = React.useState(0);
    const [state, setState ] = React.useState({
        page: 1,
        content: [],
        status: 'idle',
        numberOfPages: ''
    });

    const [ search , setSearch ] = React.useState('')
    
    const {page, status, content , numberOfPages} = state
    
    const fetchData = async () => {
        try {
            setState({...state, status: 'loading'})
           
        const res = await fetch(
            `https://api.themoviedb.org/3/search/${value ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${search}&page=${page}&include_adult=false`
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
    }, [page, value, search]);


  return (
    <Box p={2} >

        <form style={{display: "flex"}}>
        <TextField fullWidth
         variant = "filled"
         value = {search}
         onChange = {(e)=> setSearch(e.target.value)}
          />
          <Button onClick ={()=> fetchData()} >
          <SearchOutlined size ="large"  sx={{fontSize: 40}}  />
          </Button>
        </form>

        <Stack p ={2}>
        <Tabs
        value = {value}
        indicatorColor= 'primary'
        textColor='primary'
        sx ={{marginTop: 2}}
        onChange={(event, newValue) => {
            setValue(newValue);
            
        }}
        >
            <Tab label = 'Movies' sx ={{width: '50%'}} />
            <Tab label = 'TV Series' sx={{width: '50%'}} />
        </Tabs>

        </Stack>

        <Container 
        sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >

           { status === "loading" && content &&
           <CircularProgress size={40}  sx={{margin: 10}} />
           
           }


{
            status === "success" && content && search &&
            <>
            <Typography variant = "h4" component = "h1">
              Showing {value ? "Series" : "Movies"} matching {search} 
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
                      type = {value ? "tv" : "movie"}
                      />
                    )
                  })
                }
            </Box>
          </>
           }

           

           {numberOfPages > 1 && <CustomPagination setState = {setState} state = {state} /> }

           {
            status === "rejected" && 
            <ErrorComponent fetchData = {fetchData} />
            }

             {
             search && !content  &&
                 (value? 
                 <Typography 
                 color ={"text.primary"}
                 component= "h1"
                  variant = "h3">No Series Found
                  </Typography> 

                 : <Typography 
                 color ={"text.primary"}
                 component= "h1" 
                 variant = "h3">
                    No Movies Found
                 </Typography>)
                 
                 }
      
        </Container>

        

    </Box>
  )
}

export default Search