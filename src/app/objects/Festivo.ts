import { BaseObject } from './Base';
import { Empresa } from './Empresa';

export interface Festivo {
  fecha: string;
}
export class Festivo extends BaseObject implements Festivo {
  static convertFrontObject(data) {
    let festivo = new Festivo();
    festivo.fecha = data.date;

    return festivo;
  }
}
