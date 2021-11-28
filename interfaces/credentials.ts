import config from 'config';

interface ICredential {
  ChainId: number;
}

const Credential: ICredential = {
  ChainId: config.has('chainId') ? config.get<number>('chainId') : Number(process.env.chainId),
};

export const {
  ChainId,
} = Credential;
