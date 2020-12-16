export interface IProduit {
  id?: number;
  designation?: string;
  pu?: number;
}

export const defaultValue: Readonly<IProduit> = {};
