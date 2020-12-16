import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ligne-commande.reducer';
import { ILigneCommande } from 'app/shared/model/ecommerce/ligne-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneCommandeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const LigneCommande = (props: ILigneCommandeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { ligneCommandeList, match, loading } = props;
  return (
    <div>
      <h2 id="ligne-commande-heading">
        <Translate contentKey="ecommerceApp.ecommerceLigneCommande.home.title">Ligne Commandes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ecommerceApp.ecommerceLigneCommande.home.createLabel">Create new Ligne Commande</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {ligneCommandeList && ligneCommandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.ecommerceLigneCommande.quantite">Quantite</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.ecommerceLigneCommande.commande">Commande</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.ecommerceLigneCommande.produit">Produit</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ligneCommandeList.map((ligneCommande, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${ligneCommande.id}`} color="link" size="sm">
                      {ligneCommande.id}
                    </Button>
                  </td>
                  <td>{ligneCommande.quantite}</td>
                  <td>
                    {ligneCommande.commande ? <Link to={`commande/${ligneCommande.commande.id}`}>{ligneCommande.commande.id}</Link> : ''}
                  </td>
                  <td>{ligneCommande.produit ? <Link to={`produit/${ligneCommande.produit.id}`}>{ligneCommande.produit.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ligneCommande.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ligneCommande.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ligneCommande.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ecommerceApp.ecommerceLigneCommande.home.notFound">No Ligne Commandes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ ligneCommande }: IRootState) => ({
  ligneCommandeList: ligneCommande.entities,
  loading: ligneCommande.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneCommande);
