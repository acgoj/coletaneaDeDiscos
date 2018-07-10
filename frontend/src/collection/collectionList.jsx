import React from 'react'
import IconButton from '../template/iconButton'
export default props => {

    function renderRows() {
        const list = props.list || []
        if(list.length == 0)
            return <tr><td>Nenhuma coleção encontrada</td></tr>
        return list.map(collection => (
            <tr key={collection.Id}>
                <td>{collection.Name}</td>
                <td>
                    <IconButton style='primary' icon='pencil-square-o' onClick={() => props.handleEdit(collection)}/>
                    <IconButton style='danger' icon='trash-o' onClick={() => props.handleRemove(collection)}/>
                    <IconButton style='info' icon='info-circle' onClick={() => props.handleGetDisks(collection)}/>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}