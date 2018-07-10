import React from 'react'
import Grid from '../template/grid'

export default props => (
    <div role='form' className='todoForm'>
        <Grid cols='12 9 10'>
            <label className='spaceForm' >Nome</label>
            <input id='Name'
                className='form-control spaceForm' 
                onChange={props.handleChange}
                placeholder='Nome do Disco'
                value={props.disk.Name}></input>
            <label className='spaceForm'>Artista</label>
            <input id='Artist'
                className='form-control spaceForm' 
                onChange={props.handleChange}
                placeholder='Artista do Disco'
                value={props.disk.Artist}></input>
            <label className='spaceForm'>Estilo</label>
            <input id='Style'
                className='form-control spaceForm' 
                onChange={props.handleChange}
                placeholder='Estilo do Disco'
                value={props.disk.Style}></input>
            <label className='spaceForm'>Número de músicas</label>
            <input id='TracksCount'
                pattern="[0-9]*"
                className='form-control spaceForm' 
                onChange={props.handleChange}
                placeholder='Número de músicas do Disco'
                value={props.disk.TracksCount}></input>
            <label className='spaceForm'>Informações</label>
            <input id='Information'
                className='form-control spaceForm' 
                onChange={props.handleChange}
                placeholder='Informações do Disco'
                value={props.disk.Information}></input>
            <button className='btn btn-primary spaceForm' onClick={props.handleAdd}>Salvar</button>
            <button className='btn btn-danger spaceForm' onClick={props.handleCancel}>Cancelar</button>
        </Grid>
    </div>
)