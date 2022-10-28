import React from 'react'
import { Pagination } from '@mui/material'

const CustomPagination = ({setState, state}) => {
    const noOfPage = state.numberOfPages


    const handlePageChange = (e) => {
        setState({...state, page: e.target.textContent})
       
    }
  return (
    <>
        
        <Pagination 
        sx={{width: '100%', display: 'flex',marginTop: "2rem", justifyContent: 'center'}} size='large'
        color='primary' 
        shape = "rounded"
        count = {noOfPage }
        variant= "outlined"
        value  = {state.page}
        onChange={(e) => handlePageChange(e)}

        />

    </>
  )
}

export default CustomPagination