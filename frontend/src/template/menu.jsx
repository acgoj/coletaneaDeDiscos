import React from 'react'

export default props => (
    <nav className='navbar navbar-inverse bg-inverse'>
        <div className='container'>
            <div className='navbar-header'>
                <a className='navbar-brand' href='#'>
                    <i className='fa fa-music' /> Coletânea de Discos
                </a>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
                <ul className='nav navbar-nav'>
                    <li><a href='#/collection'>Coleções</a></li>
                    <li><a href='#/disk'>Discos</a></li>
                </ul>
            </div>
        </div>
    </nav>
)