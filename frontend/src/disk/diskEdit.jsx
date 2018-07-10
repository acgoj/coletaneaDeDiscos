import React, { Component } from 'react'
import axios from 'axios'
import { hashHistory } from 'react-router'

import PageHeader from '../template/pageHeader'
import DiskForm from './diskForm'
import ShowError from '../template/showError'

const URL = 'http://localhost:3000/disks'

export default class DiskEdit extends Component {
    
    constructor(props)
    {
        super(props)
        this.state = { disk: { Id: parseInt(this.props.params.id), Name: '', Artist: '', Style: '', TracksCount: 0, Information: '' } }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)

        this.refresh()
    }

    refresh()
    {
        if(!isNaN(this.state.disk.Id))
            axios.get(`${URL}/${this.state.disk.Id}`)
                .then((resp) => this.setState({ ...this.state, disk: resp.data[0]}))
                .catch(ShowError)
    }

    handleChange(e) {
        if(e.target.id == 'TracksCount' && !e.target.validity.valid)
            return
        this.setState({ ...this.state, disk: { ...this.state.disk, [e.target.id]: e.target.value} })
    }

    handleAdd() {
        const disk = this.state.disk
        if(isNaN(disk.Id))
        {
            axios.post(`${URL}/create`, { disk })
                .then(this.goToListPage)
                .catch(ShowError)
        }
        else
        {
            axios.put(`${URL}/${disk.Id}`, { disk } )
                .then(this.goToListPage)
                .catch(ShowError)
        }
    }

    goToListPage()
    {
        hashHistory.push('/disk')
    }

    render(){
        const smallTitle = isNaN(this.state.disk.Id) ? 'Cadastro de um novo disco' : 'Editar o disco'
        return (
            <div>
                <PageHeader name='Discos' small={smallTitle}/>
                <DiskForm                     
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange} 
                    handleCancel={this.goToListPage}
                    disk={this.state.disk}/>
            </div>
        )
    }
}