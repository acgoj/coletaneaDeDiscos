import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import ShowError from '../template/showError'
import DiskList from '../disk/diskList'

const URL = 'http://localhost:3000'

export default class CollectionDisks extends Component {
    constructor(props) {
        super(props)
        this.state = { collection: { Id: parseInt(this.props.params.id) }, disks: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.refresh()
    }

    refresh() 
    {
        axios.get(`${URL}/collections/${this.state.collection.Id}`)
            .then(((resp) => {
                this.setState({ ...this.state, collection: resp.data })
                axios.get(`${URL}/disks/`)
                    .then(((respDisk) => 
                        {  
                            let disks = respDisk.data
                            if(this.state.collection.Disks.length > 0)
                            {
                                for(let i = 0; i < this.state.collection.Disks.length; i++)
                                {
                                    for(let j = 0; j < disks.length; j++)
                                    {
                                        if(disks[j].Id == this.state.collection.Disks[i].Id)
                                            disks.splice(j, 1);
                                    }
                                }
                            }
                            this.setState({ ...this.state, disks: disks})
                        })).catch(ShowError)
            })).catch(ShowError)
    }

    handleRemove(disk) {
        axios.delete(`${URL}/collections/disk/${this.state.collection.Id}/${disk.Id}`)
            .then(resp => this.refresh())
            .catch(ShowError)
    }

    handleAdd(disk){
        axios.post(`${URL}/collections/disk/`,{ IdCollection: this.state.collection.Id, IdDisk: disk.Id})
            .then(resp => this.refresh())
            .catch(ShowError)
    }

    handleCancel() {
        hashHistory.push('/collection')    
    }

    render() {
        return (
            <div>
                <PageHeader name={`Discos da Coleção ${this.state.collection.Name}`} small='Todos os discos da coleção' />
                <DiskList 
                    list={this.state.collection.Disks}
                    hideEdit='true'
                    hideAdd='true'
                    handleRemove={this.handleRemove}/>      
                <PageHeader name={`Discos`} small='Todos os discos que podem ser adicionados a coleção' />
                <DiskList 
                    list={this.state.disks}
                    hideEdit='true'
                    hideRemove='true'
                    handleAdd={this.handleAdd}/>       
                <button className='btn btn-info spaceForm' onClick={this.handleCancel}>Voltar</button>
            </div>
        )
    }
}