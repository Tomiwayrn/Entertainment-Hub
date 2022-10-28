import React from 'react'
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from './pages/Movie'
import Series from './pages/Series'
import Trending from './pages/Trending'
import Search from './pages/Search'
import BottomNav from './component/BottomNav'
import Leftbar from './component/Leftbar'
import Rightbar from './component/Rightbar'
import Navbar from './component/Navbar'



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
  }, [])

  
  return (
    <BrowserRouter>

        <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} >
          <Navbar 
          setMode={setMode} 
          mode={mode}
          search = {search}
          setSearch = {setSearch}
          />
          <Stack  direction = "horizontal" spacing = {2}  justifyContent = "space-between">
            <Leftbar  setMode={setMode} mode={mode} />
 

            <Box  
            flex = {4} 
            content = "center" 
            justifyContent = 'center'
            sx={{overflow: "scroll", height: "85vh" , scrollBehaviour: "smooth", overflowX: "hidden" }}  
         
        >  

           
             <Routes>
           
               <Route path = '/'  element = {<Trending /> } />
               <Route  path = '/series'  element = {<Series />} />
               <Route path = '/movies'  element = {<Movie />} />
               <Route path = '/search'  element = {<Search />} />
             
              </Routes>

          </Box>

          
         <Rightbar />
        </Stack>

        <Box sx={{display: { xs: 'block', md: 'none'}, boxShadow: 2}}>
          {windowSize < 912 ?  <BottomNav /> : "" }
          </Box>
        </Box>

        </ThemeProvider>

    </BrowserRouter>
    
  )
}

export default App