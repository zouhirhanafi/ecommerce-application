export interface IClient {
  id?: number;
  nom?: string;
  tel?: string;
  email?: string;
}

export const defaultValue: Readonly<IClient> = {};
