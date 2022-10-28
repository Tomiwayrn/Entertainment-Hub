import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComponent({ 
  setGenre,
  selectedGenres, 
  setSelectedGenres,
  genreContent}) {

  return (
    <div style ={{alignSelf : "start"}}>
      {
        genreContent ?
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Genre</InputLabel>
        <Select 
        onChange={(e) => setSelectedGenres(e.target.value)}
        multiple
        value= {selectedGenres}
       id="grouped-select" label="Grouping">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            genreContent.map((genre)=>{
              return(
                <MenuItem key = {genre.id} value = {genre.name}>{genre.name}</MenuItem>
              )
            })
          }
          
        </Select>
      </FormControl>

        : ''
        }
    </div>
  );
}
