import { BaseObject } from './Base';
import { Fecha } from './Fecha';
import { Mes } from './Mes';

export interface Registro {
  // id?: number,
  // entrada: Fecha,
  // salida: Fecha
  // almuerzoEntrada: Fecha
  // almuerzoSalida: Fecha
  // comidaEntrada: Fecha
  // comidaSalida: Fecha
  id?: number;
  entrada: string;
  salida: string;
  almuerzoEntrada: string;
  almuerzoSalida: string;
  comidaEntrada: string;
  comidaSalida: string;
  dia: number;
  mes: number;
}
export class Registro extends BaseObject implements Registro {
  forEach(arg0: (element: any) => void) {
    throw new Error('Method not implemented.');
  }
  static convertFrontObject(data: any) {
    let registro = new Registro();
    // registro.id=data.id;
    // registro.entrada=data.entrada;
    // registro.salida=data.salida;
    // registro.almuerzoEntrada=data.almuerzo_entrada;
    // registro.almuerzoSalida=data.almuerzo_salida;
    // registro.comidaEntrada=data.comida_entrada;
    // registro.comidaSalida=data.comida_salida;
    // registro.mes=data.mes;
    registro.id = data.id;
    registro.entrada = data.entrada;
    registro.salida = data.salida;
    registro.almuerzoEntrada = data.almuerzo_entrada;
    registro.almuerzoSalida = data.almuerzo_salida;
    registro.comidaEntrada = data.comida_entrada;
    registro.comidaSalida = data.comida_salida;
    registro.dia = data.dia;
    registro.mes = data.mes_id;

    return registro;
  }
}
