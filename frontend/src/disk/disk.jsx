import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import Search from '../template/search'
import DiskList from './diskList'
import ShowError from '../template/showError';

const URL = 'http://localhost:3000/disks'

export default class Disk extends Component {
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

    handleRemove(disk) {
        axios.delete(`${URL}/${disk.Id}`)
            .then(resp => this.refresh(this.state.search))
            .catch(ShowError)
    }

    handleAdd(){
        hashHistory.push('/disk/create')
    }

    handleEdit(disk){
        hashHistory.push(`/disk/${disk.Id}`)
    }

    render() {
        return (
            <div>
                <PageHeader name='Discos' small='Todos os discos' />
                <Search 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch} 
                    handleClear={this.handleClear} 
                    search={this.state.search}/>
                <DiskList 
                    list={this.state.list}
                    hideAdd='true'
                    handleEdit={this.handleEdit}
                    handleRemove={this.handleRemove}/>
                <button className='btn btn-primary spaceForm' onClick={this.handleAdd}>Adicionar</button>
            </div>
        )
    }
}