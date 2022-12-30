import React from 'react'
import { Box, createTheme, Stack, ThemeProvider, Typography } from '@mui/material'
import { BrowserRouter, Route, Routes , Link } from "react-router-dom";
import Movie from './pages/Movie'
import Series from './pages/Series'
import Trending from './pages/Trending'
import Search from './pages/Search'
import BottomNav from './component/Navigation/BottomNav'
import Leftbar from './component/Navigation/Leftbar'
import Rightbar from './component/Navigation/Rightbar'
import Navbar from './component/Navigation/Navbar'
import ScrollButton from './component/ScrollButton';



const App = () => {
  
  const [ mode , setMode ] = React.useState('dark');
  const [ search, setSearch ] = React.useState('');
  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })


  const [ windowSize, setWindowSize ] = React.useState(window.innerWidth)

  React.useEffect(()=>{
    const handleSize = () =>{
      setWindowSize(window.innerWidth)
     } 
       window.addEventListener('resize', handleSize)

       return () => {
        window.removeEventListener('resize', handleSize)
       }
  }, []);

 
  
  return (
    <BrowserRouter>

        <ThemeProvider theme={darkTheme}>
        <Box 
        position = {"relative"}
        bgcolor={"background.default"} >
      
          <Navbar 
          setMode={setMode} 
          mode={mode}
          search = {search}
          setSearch = {setSearch}
          />
         
          <Stack  
          direction = "horizontal" 
          spacing = {2}  
          justifyContent = "space-between">

            <Leftbar  
  
            setMode={setMode} mode={mode} />
 

            <Box  
            flex = {3} 
            content = "center" 
            justifyContent = 'center'
            sx={{
              overflow: "scroll", 
              height: "100vh" , 
              scrollBehaviour: "smooth", 
              position: "relative",
              overflowX: "hidden" }}  
         
        >  
              <ScrollButton />
     
             <Routes>
           
               <Route path = '/'  element = {<Trending /> } />
               <Route  path = '/series'  element = {<Series />} />
               <Route path = '/movies'  element = {<Movie />} />
               <Route path = '/search'  element = {<Search />} />
               <Route path "/*" element = { 
                <Typography
                 sx={{ padding: "10vh" }}
                variant = "h1" >
                  Page not found 
                  <Link to = "/" >

                 <Typography variant = "h5" sx ={{color: "blue" }} >
                   Home 
                  </Typography>
                 </Link>

                 </Typography>
                 />
   
             
              </Routes>

              <Box 
        className ="bottom-nav-container"
        sx={{
          display: { xs: 'block', md: 'none'}, 
          boxShadow: 2}}
          >
          {windowSize < 912 ?  <BottomNav /> : "" }
          </Box>
          </Box>

          
         <Rightbar />
         
        </Stack>

        
        </Box>

        </ThemeProvider>

    </BrowserRouter>
    
  )
}

export default App
