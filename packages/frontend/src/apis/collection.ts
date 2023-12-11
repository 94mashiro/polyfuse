import { Collection } from '../types/collection.ts';
import { get, post } from '../utils/http.ts';

type GetCollectionListRes = Collection[];

interface CreateCollectionBody {
  name: string;
  subIds: string[];
}

interface GetCollectionDetailQuery {
  id: string;
}

interface UpdateCollectionBody extends CreateCollectionBody {
  id: string;
}

interface DeleteCollectionBody {
  id: string;
}

export const getCollectionList = () => get<GetCollectionListRes>('/api/collection/list');

export const createCollection = (body: CreateCollectionBody) => post('/api/collection/create', body);

export const getCollectionDetail = (query: GetCollectionDetailQuery) =>
  get<Collection>('/api/collection/detail', {
    params: query,
  });

export const updateCollection = (body: UpdateCollectionBody) => post('/api/collection/update', body);

export const deleteCollection = (body: DeleteCollectionBody) => post('/api/collection/delete', body);
