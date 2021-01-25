import React from 'react';
import { Switch, Route as NormalRoute } from 'react-router-dom'

import Route from './Route'

import Landing from '../pages/Landing'
import OrphanagesMap from '../pages/OrphanagesMap'
import Orphanage from '../pages/Orphanage'
import CreateOrphanage from '../pages/CreateOrphanage'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import ToBeApproved from '../pages/ToBeApproved'
import EditOrphanage from '../pages/EditOrphanage'

const Routes: React.FC = () => {
    return (
        <Switch>
            <NormalRoute path="/" exact component={Landing} />
            <NormalRoute path="/app" component={OrphanagesMap} />

            <NormalRoute path="/orphanages/create" component={CreateOrphanage} />
            <NormalRoute path="/orphanages/:id" component={Orphanage} />

            <Route path="/signin" component={SignIn} />

            <Route path="/dashboard" component={Dashboard} isPrivate />
            <Route path="/to-be-approved" component={ToBeApproved} isPrivate />

            <Route path="/edit-orphanage/:id" component={EditOrphanage} isPrivate />
        </Switch>
    )
}

export default Routes