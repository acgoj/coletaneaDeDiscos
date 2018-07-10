import React from 'react'
import Grid from '../template/grid'

export default props => (
    <div role='form' className='todoForm'>
        <Grid cols='12 9 10'>
            <label className='spaceForm'>Nome</label>
            <input id='description' 
                className='form-control spaceForm' 
                onChange={props.handleChange}
                placeholder='Nome da Coleção'
                value={props.name}></input>
            <button className='btn btn-primary spaceForm' onClick={props.handleAdd}>Salvar</button>
            <button className='btn btn-danger spaceForm' onClick={props.handleCancel}>Cancelar</button>
        </Grid>
    </div>
)