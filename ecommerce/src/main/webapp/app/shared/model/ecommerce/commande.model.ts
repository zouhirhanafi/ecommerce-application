import { Moment } from 'moment';
import { IClient } from 'app/shared/model/ecommerce/client.model';

export interface ICommande {
  id?: number;
  date?: string;
  client?: IClient;
}

export const defaultValue: Readonly<ICommande> = {};
