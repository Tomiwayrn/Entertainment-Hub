import React from 'react' 
import { YouTube , Close} from '@mui/icons-material';
import { Button, Typography, Rating , Chip, Card } from '@mui/material';
import { Stack } from '@mui/system';
import Credits from './Credits';



 const img_500 = "https://image.tmdb.org/t/p/w500";

// contentModal and singleContent
 const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";





const Item = ({content, type, id, video, setOpen}) => {


  return (
    <Card
    sx ={{display: "flex",  padding: 1,
     boxSizing: "border-box", width: "100%",position: "relative",
    alignItems: 'center', justifyContent: "center",  gap: 4}}
    className = "modal-content"
    >
      <Button
      sx={{position: "absolute", top: "0", right: "0"}}
      endIcon ={<Close />}
      color ={"error"}
      onClick={()=>setOpen(false)}
      >
        close
      </Button>
        
            <img 
            
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />

             <Stack >

                 <Typography variant = "h2" component = "h1" color ={"text.primary"}>
                    {content.title || content.original_title} ({content.original_language})
              </Typography>

            
               <Rating
                name = "read-only"
                size = "large"
                value = {(content.vote_average / 2) || 0 }
                /> 

                 {
                 content.genres &&
                  <Stack direction = "horizontal"
                  marginTop={3}
                  marginBottom={3}
                   gap = {2}>
                    {
                        content.genres.map((item)=> {
                            
                          return (
                             <Chip 
                             key = {item.id}
                             color = {"success"}
                             label = {item.name} />  
                          )     
                         } )
                    }
                </Stack>
                    }
                    
        
            <Typography variant = "h1" component = "p" color ={"text.primary"}
            sx={{fontSize: 25}}>
                {content.overview || 'Content Not Found'}
            </Typography>

            <Credits
            id = {id}
            type = {type}
            />
            <Button
            color  ={"error"}
            variant = "contained"
            target="__blank"
          href={`https://www.youtube.com/watch?v=${video}`}
            endIcon= {<YouTube />}>
              Watch Trailer
            </Button>
             </Stack>
              
        </Card>
  )
}

export default Item