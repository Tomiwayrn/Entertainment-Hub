import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Whatshot, Movie, Tv, Search } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = ({sx, sxItem}) => {

    const location = useLocation()
    const [ value, setValue ] = React.useState(null);
    const navigate = useNavigate(); 
 
    const locateOnMount = () =>{
    switch (location.pathname) {
        case ('/'): 
            setValue(0)
        
        break;

        case ('/movies'):
            setValue(1)
        
        break;

        case ('/series'):
            setValue(0)
        
        break;

        case ('/search'):
            setValue(0)
        
        break;

        default:
        break;
    }
    }

    React.useEffect(()=> {
        locateOnMount()
    }, [])


    React.useEffect(() => {
       
        if (value === 0) {
          navigate("/");
        } else if (value === 1) {
            navigate("/movies");
        } else if (value === 2) {
            navigate("/series");
        } else if (value === 3) {
            navigate("/search");
        }
      }, [value, navigate]);



  return (
    <BottomNavigation  
    marginBottom = {1}
    sx={sx}
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    showLabels
   
  >
    <BottomNavigationAction sx={sxItem}
     
      label="Trending"
      icon={<Whatshot />}
    />
    <BottomNavigationAction sx={sxItem}
   
      label="Movies"
      icon={<Movie />}
    />
    <BottomNavigationAction sx={sxItem}
      
      label="TV Series"
      icon={<Tv />}
    />
 
    <BottomNavigationAction  sx={sxItem}
     
      label="Search"
      icon={<Search />}
    />

  </BottomNavigation>

  )
}

export default BottomNav