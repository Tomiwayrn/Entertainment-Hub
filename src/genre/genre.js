import React from 'react'
import SelectComponent from '../component/SelectComponent'

const Genre = ({
    type, 
    selectedGenres,
    setSelectedGenres
}) => {

    const [ genreContent , setGenreContent ] = React.useState([])


    const fetchGenres = async()=>{
        try{
          
            const res = await fetch(
                `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const data  = await res.json()
            setGenreContent(data.genres)
             console.log(genreContent)
        }
        catch(error){
            console.log(error)
        }
    }

    
  React.useEffect(() => {
    fetchGenres();

    return () => {
        setGenreContent([]); // unmounting
    };
    // eslint-disable-next-line
  }, []);
console.log(selectedGenres)
  
  return (
    <div>
         {
        
        genreContent && 
        <SelectComponent
            selectedGenres = {selectedGenres}
            genreContent={ genreContent}
            setSelectedGenres ={setSelectedGenres}
            />
        } 
      
    </div>
  )
}

export default Genre