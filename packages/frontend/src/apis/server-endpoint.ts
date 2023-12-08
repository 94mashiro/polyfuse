import { get } from '../utils/http';

interface ServerEnv {
  version: string;
}

export const getServerEnv = () => get<ServerEnv>('/api/common/env');
