import React from 'react'
import SelectComponent from './SelectComponent'

const Genre = ({
    type, 
    selectedGenres,
    setSelectedGenres,
    setGenre
}) => {

    const [ genreContent , setGenreContent ] = React.useState([])


    const fetchGenres = async()=>{
        try{
          
            const res = await fetch(
                `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const data  = await res.json()
            setGenreContent(data.genres)
             
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


  React.useEffect(()=>{
   
    let newGenreArr = []
    
    for( let i = 0 ; i < selectedGenres.length ; i++){

     genreContent.filter((item)=>{
      if(item.name === selectedGenres[i]){
        return newGenreArr.push(item)
      }
    })
    
    
  }

  setGenre(newGenreArr)
    console.log(newGenreArr)

}, [selectedGenres])

  
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