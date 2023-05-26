import { BaseObject } from './Base';
import { Empleado } from './Empleado';

export interface Empresa {
  id: number;
  nombre: string;
  cif: string;
  empleado: Array<Empleado>;
}
export class Empresa extends BaseObject implements Empresa {
  static convertFrontObject(data) {
    let empresa = new Empresa();
    empresa.id = data.id;
    empresa.nombre = data.nombre;
    empresa.cif = data.cif;
    empresa.empleado = data.empleado;
    return empresa;
  }
}
