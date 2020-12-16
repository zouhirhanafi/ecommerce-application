import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICommande } from 'app/shared/model/ecommerce/commande.model';
import { getEntities as getCommandes } from 'app/entities/ecommerce/commande/commande.reducer';
import { IProduit } from 'app/shared/model/ecommerce/produit.model';
import { getEntities as getProduits } from 'app/entities/ecommerce/produit/produit.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ligne-commande.reducer';
import { ILigneCommande } from 'app/shared/model/ecommerce/ligne-commande.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILigneCommandeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneCommandeUpdate = (props: ILigneCommandeUpdateProps) => {
  const [commandeId, setCommandeId] = useState('0');
  const [produitId, setProduitId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ligneCommandeEntity, commandes, produits, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ligne-commande');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCommandes();
    props.getProduits();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ligneCommandeEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ecommerceApp.ecommerceLigneCommande.home.createOrEditLabel">
            <Translate contentKey="ecommerceApp.ecommerceLigneCommande.home.createOrEditLabel">Create or edit a LigneCommande</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ligneCommandeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ligne-commande-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ligne-commande-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantiteLabel" for="ligne-commande-quantite">
                  <Translate contentKey="ecommerceApp.ecommerceLigneCommande.quantite">Quantite</Translate>
                </Label>
                <AvField id="ligne-commande-quantite" type="string" className="form-control" name="quantite" />
              </AvGroup>
              <AvGroup>
                <Label for="ligne-commande-commande">
                  <Translate contentKey="ecommerceApp.ecommerceLigneCommande.commande">Commande</Translate>
                </Label>
                <AvInput id="ligne-commande-commande" type="select" className="form-control" name="commande.id">
                  <option value="" key="0" />
                  {commandes
                    ? commandes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="ligne-commande-produit">
                  <Translate contentKey="ecommerceApp.ecommerceLigneCommande.produit">Produit</Translate>
                </Label>
                <AvInput id="ligne-commande-produit" type="select" className="form-control" name="produit.id">
                  <option value="" key="0" />
                  {produits
                    ? produits.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ligne-commande" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  commandes: storeState.commande.entities,
  produits: storeState.produit.entities,
  ligneCommandeEntity: storeState.ligneCommande.entity,
  loading: storeState.ligneCommande.loading,
  updating: storeState.ligneCommande.updating,
  updateSuccess: storeState.ligneCommande.updateSuccess,
});

const mapDispatchToProps = {
  getCommandes,
  getProduits,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneCommandeUpdate);
