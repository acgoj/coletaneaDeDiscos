import React from 'react'
import IconButton from '../template/iconButton'
export default props => {

    function renderRows() {
        const list = props.list || []
        if(list.length == 0)
            return <tr><td>Nenhum disco encontrado</td></tr>
        return list.map(disk => (
            <tr key={disk.Id}>
                <td>{disk.Name}</td>
                <td>{disk.Artist}</td>
                <td>{disk.Style}</td>
                <td>{disk.TracksCount}</td>
                <td>{disk.Information}</td>
                <td>
                    <IconButton style='primary' icon='pencil-square-o' onClick={() => props.handleEdit(disk)} hide={props.hideEdit}/>
                    <IconButton style='danger' icon='trash-o' onClick={() => props.handleRemove(disk)} hide={props.hideRemove}/>
                    <IconButton style='primary' icon='plus' onClick={() => props.handleAdd(disk)} hide={props.hideAdd}/>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Artista</th>
                    <th>Estilo</th>
                    <th>Número de Músicas</th>
                    <th>Informações</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}