import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ligne-commande.reducer';
import { ILigneCommande } from 'app/shared/model/ecommerce/ligne-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneCommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneCommandeDetail = (props: ILigneCommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ligneCommandeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ecommerceApp.ecommerceLigneCommande.detail.title">LigneCommande</Translate> [
          <b>{ligneCommandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">
              <Translate contentKey="ecommerceApp.ecommerceLigneCommande.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{ligneCommandeEntity.quantite}</dd>
          <dt>
            <Translate contentKey="ecommerceApp.ecommerceLigneCommande.commande">Commande</Translate>
          </dt>
          <dd>{ligneCommandeEntity.commande ? ligneCommandeEntity.commande.id : ''}</dd>
          <dt>
            <Translate contentKey="ecommerceApp.ecommerceLigneCommande.produit">Produit</Translate>
          </dt>
          <dd>{ligneCommandeEntity.produit ? ligneCommandeEntity.produit.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ligne-commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ligne-commande/${ligneCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ligneCommande }: IRootState) => ({
  ligneCommandeEntity: ligneCommande.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneCommandeDetail);
