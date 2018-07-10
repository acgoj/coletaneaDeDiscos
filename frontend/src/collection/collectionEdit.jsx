import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import axios from 'axios'

import Config from '../../config.json'
import PageHeader from '../template/pageHeader'
import CollectionForm from './collectionForm'
import ShowError from '../template/showError';

const URL = `${Config.URLBack}/collections`

export default class CollectionEdit extends Component {
    constructor(props)
    {
        super(props)
        this.state = { collection: { Id: parseInt(this.props.params.id), Name: ''  } }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)

        this.refresh()
    }

    refresh()
    {
        if(!isNaN(this.state.collection.Id))
            axios.get(`${URL}/${this.state.collection.Id}`)
                .then((resp) => this.setState({ ...this.state, collection: resp.data}))
                .catch(ShowError)
    }

    handleChange(e) {
        this.setState({ ...this.state, collection: { ...this.state.collection, Name: e.target.value} })
    }

    handleAdd() {
        const collection = this.state.collection
        if(isNaN(collection.Id))
        {
            axios.post(`${URL}/create`, { collection })
                .then(this.goToListPage)
                .catch(ShowError)
        }
        else
        {
            axios.put(`${URL}/${collection.Id}`, { collection } )
                .then(this.goToListPage)
                .catch(ShowError)
        }
    }

    goToListPage()
    {
        hashHistory.push('/collection')
    }

    render(){
        const collection = this.state.collection
        const smallTitle = isNaN(collection.Id) ? 'Cadastro de uma nova coleção' : 'Editar a coleção'
        return (
            <div>
                <PageHeader name='Coleção' small={smallTitle}/>
                <CollectionForm 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange} 
                    handleCancel={this.goToListPage}
                    name={collection.Name}
                    />
            </div>
        )
    }
}