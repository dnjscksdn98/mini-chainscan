import config from 'config';

interface ICredential {
  MySQL: IMySQLCredential;
  ChainId: number;
}

interface IMySQLCredential {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const Credential: ICredential = {
  MySQL: config.get<IMySQLCredential>('MySQL'),
  ChainId: config.has('chainId') ? config.get<number>('chainId') : Number(process.env.chainId),
};

export const {
  MySQL,
  ChainId,
} = Credential;
