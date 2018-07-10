import React, { Component } from 'react'
import axios from 'axios'
import { hashHistory } from 'react-router'

import PageHeader from '../template/pageHeader'
import Search from '../template/search'
import CollectionList from './CollectionList'
import ShowError from '../template/showError'

const URL = 'http://localhost:3000/collections'

export default class Collection extends Component {
    constructor(props) {
        super(props)
        this.state = { search: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        
        this.refresh()
    }

    refresh(search = '') 
    {
        const txtSearch = search ? '/search/' + search : ''
        console.log(search)
        axios.get(`${URL}${txtSearch}`)
            .then(((resp) => this.setState({ ...this.state, search, list: resp.data })))
            .catch(ShowError)
    }

    handleSearch(){
        this.refresh(this.state.search)
    }

    handleClear(){
        this.refresh()
    }

    handleChange(e) {
        this.setState({ ...this.state, search: e.target.value })
    }

    handleRemove(collection) {
        axios.delete(`${URL}/${collection.Id}`)
            .then(resp => this.refresh(this.state.search))
            .catch(ShowError)
    }

    handleAdd() {
        hashHistory.push('/collection/create')
    }
    
    handleEdit(collection){
        hashHistory.push(`/collection/${collection.Id}`)
    }

    handleGetDisks(collection){
        hashHistory.push(`/collection/disk/${collection.Id}`)
    }

    render() {
        return (
            <div>
                <PageHeader name='Coleções' small='Todos as Coleções' />
                <Search 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch} 
                    handleClear={this.handleClear} 
                    search={this.state.search} />
                <CollectionList 
                    list={this.state.list} 
                    handleEdit={this.handleEdit}
                    handleRemove={this.handleRemove}
                    handleGetDisks={this.handleGetDisks}/>
                <button className='btn btn-primary spaceForm' onClick={this.handleAdd}>Adicionar</button>
            </div>
        )
    }
}