import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Disk from '../disk/disk'
import DiskEdit from '../disk/diskEdit'
import Collection from '../collection/collection'
import CollectionEdit from '../collection/collectionEdit'
import CollectionDisks from '../collection/collectionDisks'

export default props => (
    <Router history={hashHistory}>
        <Route path='/disk' component={Disk} />
        <Route path='/disk/create' component={DiskEdit} />
        <Route path='/disk/:id' component={DiskEdit} />
        <Route path='/collection' component={Collection} />
        <Route path='/collection/disk/:id' component={CollectionDisks} />
        <Route path='/collection/:id' component={CollectionEdit} />
        <Route path='/collection/create' component={CollectionEdit} />
        <Redirect from='*' to='/collection' />
    </Router>
)