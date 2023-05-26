import { BaseObject } from './Base';
import { Empleado } from './Empleado';
import { Fecha } from './Fecha';

export interface Mes {
  id?: number;
  fecha: Date;
  empleado: Empleado;
}
export class Mes extends BaseObject implements Mes {
  [x: string]: any;
  static convertFrontObject(data) {
    let mes = new Mes();
    mes.id = data.id;
    mes.fecha = data.fecha;
    mes.empleado = data.empleado;
    return mes;
  }
}
