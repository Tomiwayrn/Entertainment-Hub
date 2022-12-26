import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Whatshot, Movie, Tv, Search } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {

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
    className = {"bottom-nav"}
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    showLabels
   
  >
    <BottomNavigationAction
      className = {"bottom-nav-item"}
      label="Trending"
      icon={<Whatshot />}
    />
    <BottomNavigationAction 
      className = {"bottom-nav-item"}
      label="Movies"
      icon={<Movie />}
    />
    <BottomNavigationAction 
      className = {"bottom-nav-item"}
      label="TV Series"
      icon={<Tv />}
    />
 
    <BottomNavigationAction  
     className = {"bottom-nav-item"}
      label="Search"
      icon={<Search />}
    />

  </BottomNavigation>

  )
}

export default BottomNav
