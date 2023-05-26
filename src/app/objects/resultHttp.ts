import { BaseObject } from './Base';

export interface resultHttp {
  status: number;
  ok: boolean;
  mensaje: String;
  data?: Array<any>;
}
export class resultHttp extends BaseObject implements resultHttp {}
