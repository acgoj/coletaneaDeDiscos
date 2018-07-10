import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
        if(e.key == 'Enter') {
            props.handleSearch()
        }
        else if(e.key == 'Escape'){
            props.handleClear()
        }
    }
    return (
        <div role='form' className='search'>
            <Grid cols='12 9 10'>
                <input id='description' 
                    className='form-control' 
                    onChange={props.handleChange}
                    onKeyUp= {keyHandler}
                    placeholder={props.placeholder}
                    value={props.search}></input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='info' icon='search' onClick={props.handleSearch}/>
                <IconButton style='default' icon='close' onClick={props.handleClear}/>
            </Grid>
        </div>
    )
}