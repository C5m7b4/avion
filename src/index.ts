import avion from './avion';
export {
  XhrOptions,
  VERBS,
  READY_STATES,
  RequestOptions,
  HeaderInterface,
  AvionResult,
  ResponseType,
  AvionResponse,
  AvionPromise,
} from './interfaces';

export { get } from './Get';
export { post } from './Post';
export { put } from './Put';
export { del } from './Delete';

export default avion;
