import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './commande.reducer';
import { ICommande } from 'app/shared/model/ecommerce/commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Commande = (props: ICommandeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { commandeList, match, loading } = props;
  return (
    <div>
      <h2 id="commande-heading">
        <Translate contentKey="ecommerceApp.ecommerceCommande.home.title">Commandes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ecommerceApp.ecommerceCommande.home.createLabel">Create new Commande</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {commandeList && commandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.ecommerceCommande.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.ecommerceCommande.client">Client</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commandeList.map((commande, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${commande.id}`} color="link" size="sm">
                      {commande.id}
                    </Button>
                  </td>
                  <td>{commande.date ? <TextFormat type="date" value={commande.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{commande.client ? <Link to={`client/${commande.client.id}`}>{commande.client.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${commande.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commande.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commande.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ecommerceApp.ecommerceCommande.home.notFound">No Commandes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ commande }: IRootState) => ({
  commandeList: commande.entities,
  loading: commande.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Commande);
