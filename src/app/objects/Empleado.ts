import { BaseObject } from './Base';
import { Empresa } from './Empresa';

export interface Empleado {
  id: number;
  password: string;
  nombre: string;
  apellidos: string;
  correo: string;
  dni: string;
  roles: string;
  empresas: Empresa;
}
export class Empleado extends BaseObject implements Empleado {
  static convertFrontObject(data) {
    let empleado = new Empleado();
    empleado.id = data.id;
    empleado.password = data.password;
    empleado.nombre = data.nombre;
    empleado.apellidos = data.apellidos;
    empleado.correo = data.correo;
    empleado.dni = data.dni;
    empleado.roles = data.roles[0];
    empleado.empresas = data.empresas;
    return empleado;
  }
}
