import { Collection } from '../types/collection.ts';
import { get } from '../utils/http.ts';

type GetCollectionListRes = Collection[];

export const getCollectionList = () => get<GetCollectionListRes>('/api/collection/list');
