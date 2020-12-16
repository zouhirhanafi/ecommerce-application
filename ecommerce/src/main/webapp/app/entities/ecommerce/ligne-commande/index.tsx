import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LigneCommande from './ligne-commande';
import LigneCommandeDetail from './ligne-commande-detail';
import LigneCommandeUpdate from './ligne-commande-update';
import LigneCommandeDeleteDialog from './ligne-commande-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LigneCommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LigneCommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LigneCommandeDetail} />
      <ErrorBoundaryRoute path={match.url} component={LigneCommande} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LigneCommandeDeleteDialog} />
  </>
);

export default Routes;
