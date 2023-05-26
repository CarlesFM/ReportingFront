export interface Fecha {
  year: number;
  mes: number;
  dia: number;
  hora: number;
  minutos: number;
  segundos: number;
}
export class Fecha implements Fecha {
  constructor(backendFecha?: string) {
    if (backendFecha != null) {
      if (this.constructor.name == backendFecha.constructor.name) {
        let obj = Object.keys(backendFecha);
        for (let i = 0; i < Object.keys(backendFecha).length; i++) {
          let value = obj[i];
          this[value] = backendFecha[value];
        }
      } else {
        let f = Fecha.phpConvert(backendFecha);
        this.year = Number(f.year);
        this.mes = Number(f.mes);
        this.dia = Number(f.dia);
        this.hora = Number(f.hora);
        this.minutos = Number(f.minutos);
      }
    }
  }
  static segundosConverter(segundos: number): Fecha {
    let p = new Fecha();
    let horas = ~~(segundos / 3600);
    let min = ~~((segundos % 3600) / 60);
    let seg = ~~segundos % 60;
    // Hours, minutes and seconds
    p.hora = horas;
    p.minutos = min;
    p.segundos = seg;
    return p;
  }
  static javascriptConvert(data: Date): Fecha {
    let p = new Fecha();
    p.year = data.getFullYear();
    p.mes = data.getMonth() + 1;
    p.dia = data.getDate();
    p.hora = data.getHours();
    p.minutos = data.getMinutes();
    p.segundos = data.getSeconds();
    return p;
  }
  static fechaToJavascript(fecha: Fecha): Date {
    if (fecha.hora == null) {
      fecha.hora = 0;
    }
    if (fecha.minutos == null) {
      fecha.minutos = 0;
    }
    if (fecha.segundos == null) {
      fecha.segundos = 0;
    }
    return new Date(
      fecha.year +
        '-' +
        fecha.mes +
        '-' +
        fecha.dia +
        ' ' +
        fecha.hora +
        ':' +
        fecha.minutos +
        ':' +
        fecha.segundos
    );
  }
  static phpConvert(string: String): Fecha {
    let p = new Fecha();
    let f;
    if (string.includes(' ')) {
      f = string.split(' ');
    } else if (string.includes('T')) {
      f = string.split('T');
    } else {
      console.error('Formato incorrecto de fecha', f);
    }
    let fecha = f[0].split('-');
    let momento = f[1].split(':');
    p.year = Number(fecha[0]);
    p.mes = Number(fecha[1]);
    p.dia = Number(fecha[2]);
    p.hora = Number(momento[0]);
    p.minutos = Number(momento[1]);
    if (momento[2].includes('.')) {
      p.segundos = Number(momento[2].split('.')[0]);
    } else if (momento[2].includes('+')) {
      p.segundos = Number(momento[2].split('+')[0]);
    } else {
      p.segundos = Number(momento[2]);
      //console.error("Formato incorrecto de fecha",f);
    }
    return p;
  }
  toJavascript(): Date {
    return Fecha.fechaToJavascript(this);
  }
  equals(object) {
    if (this.constructor.name != object.constructor.name) {
      return false;
    }
    let obj = Object.keys(this);
    for (let i = 0; i < Object.keys(this).length; i++) {
      let value = obj[i];
      if (value in object) {
        if (object[value] != this[value]) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
  toStringLarge(reverse?: boolean) {
    if (reverse != null && reverse) {
      return this.toString(reverse) + ' ' + this.toStringHoras();
    }
    return this.toString() + ' ' + this.toStringHoras();
  }
  toStringHoras() {
    return (
      this.ceroLeft(this.hora, '0', 2) +
      ':' +
      this.ceroLeft(this.minutos, '0', 2) +
      ':' +
      this.ceroLeft(this.segundos, '0', 2)
    );
  }
  protected ceroLeft(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
  toString(reverse?: boolean) {
    if (reverse != null && reverse) {
      return (
        this.year +
        '/' +
        this.mesAbreviacion() +
        '/' +
        this.ceroLeft(this.dia, '0', 2)
      );
    }
    return (
      this.ceroLeft(this.dia, '0', 2) +
      '/' +
      this.mesAbreviacion() +
      '/' +
      this.year
    );
  }
  mesAbreviacion() {
    //Están dentro debido a que devolvería también esta variable cuando haces un new Fecha
    let mesesAbrevicion = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    return mesesAbrevicion[this.mes - 1];
  }
  mesNombre() {
    //Están dentro debido a que devolvería también esta variable cuando haces un new Fecha
    let meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return meses[this.mes - 1];
  }
  static mesAbreviacion(mes) {
    let mesesAbrevicionFixError = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    return mesesAbrevicionFixError[mes];
  }
  static mesNombre(mes) {
    let mesesFixError = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return mesesFixError[mes];
  }
  static mesNumber(mes) {
    let mesesFixError = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return mesesFixError.indexOf(mes) + 1;
  }
  static mesNumberAbreviacion(mes) {
    let mesesAbrevicionFixError = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    return mesesAbrevicionFixError.indexOf(mes) + 1;
  }
  static cerosAdd(number) {
    let pad = '0';
    let length = 2;
    return (new Array(length + 1).join(pad) + number).slice(-length);
  }
}
