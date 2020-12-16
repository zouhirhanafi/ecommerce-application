import { ICommande } from 'app/shared/model/ecommerce/commande.model';
import { IProduit } from 'app/shared/model/ecommerce/produit.model';

export interface ILigneCommande {
  id?: number;
  quantite?: number;
  commande?: ICommande;
  produit?: IProduit;
}

export const defaultValue: Readonly<ILigneCommande> = {};
