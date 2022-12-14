import React from 'react';
import { Paper, Typography, Box} from '@mui/material'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


 const img_300 = "https://image.tmdb.org/t/p/w300";
 const noPicture =
 "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

function Credits({id, type})
{

    const [credits, setCredits] = React.useState([]);

    const fetchCredits = async()=>{
        console.log(id)
        const res  = await fetch(
            `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
          );

        const data = await res.json()
          setCredits(data.cast);
        
    }

    React.useEffect(()=>{
        fetchCredits()

    }, [])


    const items =  credits.map((item)=>{
        return (
            <Paper key = {item.cast_id} >
                <img
                 loading= "lazy"
                 height= "140"
                  src={ item.profile_path ?
                     `${img_300}/${item.profile_path}`
                    : noPicture
                    }
                  alt= {item.name}
                  />
                <Typography variant='h6' component = "h1" color ={"text.primary"}>
                    {item.name}
                </Typography>
            </Paper>
        )

    })

    const responsive = {
        0: {
          items: 2,
        },
        512: {
            items:3,
        },
        1024: {
          items: 5,
        },
      };
   



    return (
        <Box sx={{width: "100%",margin: "0 auto", maxWidth: {sm: 340 ,md: 400, lg:610}}} >
        <AliceCarousel
      mouseTracking
      infinite
      ani
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
    </Box>
    )
}



export default Credits