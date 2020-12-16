import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ILigneCommande, defaultValue } from 'app/shared/model/ecommerce/ligne-commande.model';

export const ACTION_TYPES = {
  FETCH_LIGNECOMMANDE_LIST: 'ligneCommande/FETCH_LIGNECOMMANDE_LIST',
  FETCH_LIGNECOMMANDE: 'ligneCommande/FETCH_LIGNECOMMANDE',
  CREATE_LIGNECOMMANDE: 'ligneCommande/CREATE_LIGNECOMMANDE',
  UPDATE_LIGNECOMMANDE: 'ligneCommande/UPDATE_LIGNECOMMANDE',
  DELETE_LIGNECOMMANDE: 'ligneCommande/DELETE_LIGNECOMMANDE',
  RESET: 'ligneCommande/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILigneCommande>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type LigneCommandeState = Readonly<typeof initialState>;

// Reducer

export default (state: LigneCommandeState = initialState, action): LigneCommandeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIGNECOMMANDE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIGNECOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LIGNECOMMANDE):
    case REQUEST(ACTION_TYPES.UPDATE_LIGNECOMMANDE):
    case REQUEST(ACTION_TYPES.DELETE_LIGNECOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LIGNECOMMANDE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIGNECOMMANDE):
    case FAILURE(ACTION_TYPES.CREATE_LIGNECOMMANDE):
    case FAILURE(ACTION_TYPES.UPDATE_LIGNECOMMANDE):
    case FAILURE(ACTION_TYPES.DELETE_LIGNECOMMANDE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNECOMMANDE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNECOMMANDE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIGNECOMMANDE):
    case SUCCESS(ACTION_TYPES.UPDATE_LIGNECOMMANDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIGNECOMMANDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'services/ecommerce/api/ligne-commandes';

// Actions

export const getEntities: ICrudGetAllAction<ILigneCommande> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LIGNECOMMANDE_LIST,
  payload: axios.get<ILigneCommande>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ILigneCommande> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNECOMMANDE,
    payload: axios.get<ILigneCommande>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILigneCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIGNECOMMANDE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILigneCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIGNECOMMANDE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILigneCommande> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIGNECOMMANDE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
