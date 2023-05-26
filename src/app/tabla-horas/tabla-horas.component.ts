import {
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ɵɵtrustConstantResourceUrl,
} from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DatePipe } from '@angular/common';
import { MesService } from '../services/api/mes.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  throwError,
} from 'rxjs';
import { Mes } from '../objects/Mes';
import { computeMsgId } from '@angular/compiler';
import { RegistroService } from '../services/api/registro.service';
import { UnsubscribesDestroy } from 'src/app/objects/unsubscribesDestroy';
import { Registro } from '../objects/Registro';
import { EmpleadoService } from '../services/api/empleado.service';
import { Empleado } from '../objects/Empleado';
import { Fecha } from '../objects/Fecha';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EmpresaService } from '../services/api/empresa.service';
import { Empresa } from '../objects/Empresa';
import { FestivoService } from '../services/api/festivo.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

registerLocaleData(localeEs, 'es-ES');

@Component({
  selector: 'app-tabla-horas',
  templateUrl: './tabla-horas.component.html',
  styleUrls: ['./tabla-horas.component.css'],
})
export class TablaHorasComponent extends UnsubscribesDestroy implements OnInit {
  meses: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  mesesES: string[] = [
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
  fechaActual: Date = new Date();
  fechaTabla: Date = new Date(
    '' +
      this.meses[this.fechaActual.getMonth()] +
      ' 1,' +
      this.fechaActual.getFullYear()
  );
  dias: any;
  mes: any | null = null;
  anyo: number = this.fechaActual.getFullYear();
  id: number = 0;

  empleados: Array<string> = [];
  empleado: String = '';
  dni: string = '';
  roles: string[] = ['Usuario', 'Administrador'];
  rolSelect: string = 'Usuario';
  datosEmpleados: Array<Empleado> = [];

  dniValido: string = 'true';

  horasEntrada: any[] = [];
  mesExiste: boolean = false;
  entrada: any;
  salida: any;
  almuerzoEntrada: any;
  almuerzoSalida: any;
  comidaEntrada: any;
  comidaSalida: any;
  registro: Registro | null = null;

  horaEntrada: string[] = [];
  horaSalida: string[] = [];
  horaAlmuerzoEntrada: string[] = [];
  horaAlmuerzoSalida: string[] = [];
  horaComidaEntrada: string[] = [];
  horaComidaSalida: string[] = [];

  festivos: number = -1;

  disabledInputs: boolean[][] = [[]];
  display: Array<boolean> = [];

  arrayGuardar: Array<any> = [];
  empleadoGuardar: Empleado = new Empleado();

  horaInputEntrada: String = '09:00';
  horaInputSalida: string = '18:00';
  horaInputAlmuerzoEntrada: string = '12:00';
  horaInputAlmuerzoSalida: string = '12:30';
  horaInputComidaEntrada: string = '14:00';
  horaInputComidaSalida: string = '15:00';

  empleadoNombre: string = '';
  empleadoApellidos: string = '';
  empleadoDNI: string = '';

  empresas: Array<string> = [];
  empresa: string = '';
  empresaSelect: string = '';
  cif: string = '';

  heigth: string = '';
  largo: string = 'largo';

  constructor(
    @Inject(LOCALE_ID) private localeEs: string,
    private mesSE: MesService,
    private rutaActiva: ActivatedRoute,
    private registroSE: RegistroService,
    private empleadoSE: EmpleadoService,
    private empresasSE: EmpresaService,
    private festivoSE: FestivoService,
    private router: Router
  ) {
    super();
  }

  setDias() {
    if (
      this.fechaTabla.getMonth() == 0 ||
      this.fechaTabla.getMonth() == 2 ||
      this.fechaTabla.getMonth() == 4 ||
      this.fechaTabla.getMonth() == 6 ||
      this.fechaTabla.getMonth() == 7 ||
      this.fechaTabla.getMonth() == 9 ||
      this.fechaTabla.getMonth() == 11
    ) {
      this.dias = new Array(31);
      this.horaEntrada = new Array(31);
      this.horaSalida = new Array(31);
      this.horaAlmuerzoEntrada = new Array(31);
      this.horaAlmuerzoSalida = new Array(31);
      this.horaComidaEntrada = new Array(31);
      this.horaComidaSalida = new Array(31);
    } else if (this.fechaTabla.getMonth() == 1) {
      if (
        (this.fechaTabla.getFullYear() % 4 == 0 &&
          this.fechaTabla.getFullYear() % 100 != 0) ||
        this.fechaTabla.getFullYear() % 400 == 0
      ) {
        this.dias = new Array(29);
        this.horaEntrada = new Array(29);
        this.horaSalida = new Array(29);
        this.horaAlmuerzoEntrada = new Array(29);
        this.horaAlmuerzoSalida = new Array(29);
        this.horaComidaEntrada = new Array(29);
        this.horaComidaSalida = new Array(29);
      } else {
        this.dias = new Array(28);
        this.horaEntrada = new Array(28);
        this.horaSalida = new Array(28);
        this.horaAlmuerzoEntrada = new Array(28);
        this.horaAlmuerzoSalida = new Array(28);
        this.horaComidaEntrada = new Array(28);
        this.horaComidaSalida = new Array(28);
      }
    } else {
      this.dias = new Array(30);
      this.horaEntrada = new Array(30);
      this.horaSalida = new Array(30);
      this.horaAlmuerzoEntrada = new Array(30);
      this.horaAlmuerzoSalida = new Array(30);
      this.horaComidaEntrada = new Array(30);
      this.horaComidaSalida = new Array(30);
    }
  }

  setFindes() {
    for (let i = 0; i < this.dias.length; i++) {
      let diaSemana = this.fechaTabla.getDay();
      let diaNum = this.fechaTabla.getDate();

      if (diaSemana == 0 || diaSemana == 6) {
        this.festivo(diaNum - 1);
      } else {
        this.disabledInputs[i][0] = false;
        this.disabledInputs[i][1] = false;
        this.disabledInputs[i][2] = false;
        this.disabledInputs[i][3] = false;
        this.disabledInputs[i][4] = false;
        this.disabledInputs[i][5] = false;
      }

      this.fechaTabla.setDate(diaNum + 1);
    }
  }

  setFestivos(anyo) {
    this.festivoSE.getAllFestivos(anyo);
    this.festivoSE
      .getResultFestivos()
      .pipe(takeUntil(this._unsubInd7))
      .subscribe((data) => {
        if (data == null) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          let dia = '';
          let mes = '';

          dia = data[i].fecha;
          mes = dia.split('-')[1];
          dia = dia.split('-')[2];

          if (this.mesesES[parseInt(mes) - 1] == this.mes) {
            this.festivo(parseInt(dia) - 1);
          }
        }
        this._unsubInd7.next(' ');
      });
  }

  setMesTabla(mes: string) {
    for (let i = 0; i < this.dias.length; i++) {
      if (this.display[i] == false) {
        this.display[i] = true;
      }
    }
    this.fechaTabla = new Date(
      '' +
        (this.mesesES.indexOf(mes) + 1) +
        ' 1,' +
        this.fechaActual.getFullYear()
    );

    this.crearMes();
    this.setDias();
    this.setFestivos(this.fechaTabla.getFullYear());
    this.setFindes();
    this.imprimirRegistros(this.id);
  }

  setAnyo(anyo: number) {
    this.fechaTabla = new Date(
      '' + (this.mesesES.indexOf(this.mes) + 1) + ' 1,' + anyo
    );
    this.crearMes();
    this.setDias();
    this.setFindes();
    this.imprimirRegistros(this.id);
  }

  festivo(fila: number) {
    if (fila === this.festivos) {
      // HAbilita los inputs en caso de haberlos deshabilitado por error
      this.festivos = -1;
      for (let i = 0; i < this.disabledInputs[fila].length; i++) {
        this.disabledInputs[fila][i] = false;
        this.imprimirRegistros(this.id);
      }
    } else {
      // Deshabilita los inputs si es un dia festivo
      this.festivos = fila;
      for (let i = 0; i < this.disabledInputs[fila].length; i++) {
        this.disabledInputs[fila][i] = true;
        this.horaEntrada[fila] = '--:--';
        this.horaSalida[fila] = '--:--';
        this.horaAlmuerzoEntrada[fila] = '--:--';
        this.horaAlmuerzoSalida[fila] = '--:--';
        this.horaComidaEntrada[fila] = '--:--';
        this.horaComidaSalida[fila] = '--:--';
      }
    }
  }

  crearMes() {
    let fecha: string = `${this.fechaTabla.getFullYear()}-${
      String(this.fechaTabla.getMonth()).length < 2
        ? '0' + String(this.fechaTabla.getMonth() + 1)
        : String(this.fechaTabla.getMonth() + 1)
    }-01`;
    let fechaGuardada;
    let fechaExiste: boolean = false;
    this.mesSE.getAllMes(this.id);

    this.mesSE
      .getResultMes()
      .pipe(takeUntil(this._unsubInd3))
      .subscribe((data) => {
        if (data == null) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          fechaGuardada = data[i].fecha;
          fechaGuardada = fechaGuardada.split('T')[0];
          if (fecha == fechaGuardada) {
            fechaExiste = true;
          }
        }
        if (!fechaExiste) {
          this.mesSE.setMesFecha(fecha, this.id);
        }
        this._unsubInd3.next(' ');
      });
  }

  setID(empleado) {
    for (let i = 0; i < this.datosEmpleados.length; i++) {
      if (empleado.split(' ')[0] === this.datosEmpleados[i].nombre) {
        this.id = this.datosEmpleados[i].id;
        break;
      }
    }

    this.empleadoSE.getEmpleadoUnico(this.id).subscribe((data) => {
      this.empleadoApellidos = data.apellidos;
      this.empleadoNombre = data.nombre;
      this.empleadoDNI = data.dni;
    });
    this.horaEntrada = [];
    this.horaSalida = [];
    this.horaAlmuerzoEntrada = [];
    this.horaAlmuerzoSalida = [];
    this.horaComidaEntrada = [];
    this.horaComidaSalida = [];
    this.imprimirRegistros(this.id);
  }

  setEmpresa(empresa) {
    this.empresasSE.getAllEmpresas();
    this.empresasSE
      .getEmpresasResult()
      .pipe(takeUntil(this._unsubInd5))
      .subscribe((data) => {
        if (data == null) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].nombre == empresa) {
            this.cif = data[i].cif;
          }
        }

        this._unsubInd5.next(' ');
      });

    this.empleadoSE.getEmpleadoAll();
    this.empleadoSE
      .getEmpleadosResult()
      .pipe(takeUntil(this._unsubInd5))
      .subscribe((data) => {
        this.empleados = [];
        if (data == null) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].empresas.nombre == empresa) {
            this.datosEmpleados.push(data[i]);
            this.empleados.push(data[i].nombre + ' ' + data[i].apellidos);
          }
        }
        this.empleado = this.empleados[0];
        this.setID(this.empleado);
      });
  }

  guardar(posicionRegistro) {
    let registroExiste: boolean = false;

    let fecha = this.anyo + '-' + (this.mesesES.indexOf(this.mes) + 1) + '-1';
    let mesID;

    this.mesSE.getMesUnico(this.id, fecha).subscribe((data) => {
      if (data == null) {
        return;
      }
      mesID = data[0].id;

      this.registroSE.getRegistrosEmpleado(this.id);
      this.registroSE
        .getRegistroEmpleadoResult()
        .pipe(takeUntil(this._unsubInd2))
        .subscribe((value) => {
          if (value == null) {
            return;
          }

          for (let i = 0; i < value.length; i++) {
            if (value[i].dia == posicionRegistro + 1 && mesID == value[i].mes) {
              let entrada =
                this.horaEntrada[posicionRegistro] == undefined
                  ? null
                  : this.horaEntrada[posicionRegistro];
              let salida =
                this.horaSalida[posicionRegistro] == undefined
                  ? null
                  : this.horaSalida[posicionRegistro];
              let almuerzoEntrada =
                this.horaAlmuerzoEntrada[posicionRegistro] == undefined
                  ? null
                  : this.horaAlmuerzoEntrada[posicionRegistro];
              let almuerzoSalida =
                this.horaAlmuerzoSalida[posicionRegistro] == undefined
                  ? null
                  : this.horaAlmuerzoSalida[posicionRegistro];
              let comidaEntrada =
                this.horaComidaEntrada[posicionRegistro] == undefined
                  ? null
                  : this.horaComidaEntrada[posicionRegistro];
              let comidaSalida =
                this.horaComidaSalida[posicionRegistro] == undefined
                  ? null
                  : this.horaComidaSalida[posicionRegistro];
              let dia = posicionRegistro + 1;

              registroExiste = true;
              this.registroSE.editRegistro(
                value[i].id,
                entrada,
                salida,
                almuerzoEntrada,
                almuerzoSalida,
                comidaEntrada,
                comidaSalida,
                dia
              );
              break;
            }
          }
          if (!registroExiste) {
            let mes = mesID;
            let entrada =
              this.horaEntrada[posicionRegistro] == undefined
                ? null
                : this.horaEntrada[posicionRegistro];
            let salida =
              this.horaSalida[posicionRegistro] == undefined
                ? null
                : this.horaSalida[posicionRegistro];
            let almuerzoEntrada =
              this.horaAlmuerzoEntrada[posicionRegistro] == undefined
                ? null
                : this.horaAlmuerzoEntrada[posicionRegistro];
            let almuerzoSalida =
              this.horaAlmuerzoSalida[posicionRegistro] == undefined
                ? null
                : this.horaAlmuerzoSalida[posicionRegistro];
            let comidaEntrada =
              this.horaComidaEntrada[posicionRegistro] == undefined
                ? null
                : this.horaComidaEntrada[posicionRegistro];
            let comidaSalida =
              this.horaComidaSalida[posicionRegistro] == undefined
                ? null
                : this.horaComidaSalida[posicionRegistro];
            let dia = posicionRegistro + 1;

            this.registroSE.setRegistros(
              mes,
              entrada,
              salida,
              almuerzoEntrada,
              almuerzoSalida,
              comidaEntrada,
              comidaSalida,
              dia
            );
          }
          this._unsubInd2.next(' ');
        });
    });
  }

  ocultarMostrar() {
    for (let i = 0; i < this.dias.length; i++) {
      if (this.display[i] == false) {
        this.display[i] = true;
        this.largo = 'largo';
        this.heigth = '';
      } else if (this.disabledInputs[i][0]) {
        this.display[i] = false;
        this.largo = 'largoFestivo';
        this.heigth = 'height';
      }
    }
  }

  imprimirRegistros(id) {
    let mesEmpleado;
    let mesBuscar: any = this.mesesES.indexOf(this.mes) + 1;
    mesBuscar =
      String(mesBuscar).length < 2
        ? String('0' + mesBuscar)
        : String(mesBuscar);
    let mesRegistros;
    let anyoEmpleado;
    let entrada,
      salida,
      almuerzoEntrada,
      almuerzoSalida,
      comidaEntrada,
      comidaSalida;
    this.mesSE.getAllMes(id);
    this.mesSE
      .getResultMes()
      .pipe(takeUntil(this._unsub))
      .subscribe((value) => {
        if (value == null) {
          return;
        }
        for (let i = 0; i < value.length; i++) {
          mesEmpleado = value[i].fecha;
          mesEmpleado = mesEmpleado.split('T');
          anyoEmpleado = mesEmpleado[0].split('-')[0];
          mesEmpleado = mesEmpleado[0].split('-')[1];
          if (this.anyo == anyoEmpleado) {
            if (mesBuscar == mesEmpleado) {
              mesRegistros = value[i].id;
            }
          }
        }
        this.registroSE.getRegistrosEmpleado(id);
        this.registroSE
          .getRegistroEmpleadoResult()
          .pipe(takeUntil(this._unsubInd))
          .subscribe((data) => {
            if (data == null) {
              return;
            }
            for (let i = 0; i < data.length; i++) {
              if (data[i].entrada != undefined && mesRegistros == data[i].mes) {
                entrada = data[i].entrada;
                entrada = entrada.split(':');
                entrada = entrada[0] + ':' + entrada[1];
                this.horaEntrada[data[i].dia - 1] = entrada;
              }
              if (data[i].salida != undefined && mesRegistros == data[i].mes) {
                salida = data[i].salida;
                salida = salida.split(':');
                salida = salida[0] + ':' + salida[1];
                this.horaSalida[data[i].dia - 1] = salida;
              }
              if (
                data[i].almuerzoEntrada != undefined &&
                mesRegistros == data[i].mes
              ) {
                almuerzoEntrada = data[i].almuerzoEntrada;
                almuerzoEntrada = almuerzoEntrada.split(':');
                almuerzoEntrada = almuerzoEntrada[0] + ':' + almuerzoEntrada[1];
                this.horaAlmuerzoEntrada[data[i].dia - 1] = almuerzoEntrada;
              }
              if (
                data[i].almuerzoSalida != undefined &&
                mesRegistros == data[i].mes
              ) {
                almuerzoSalida = data[i].almuerzoSalida;
                almuerzoSalida = almuerzoSalida.split(':');
                almuerzoSalida = almuerzoSalida[0] + ':' + almuerzoSalida[1];
                this.horaAlmuerzoSalida[data[i].dia - 1] = almuerzoSalida;
              }
              if (
                data[i].comidaEntrada != undefined &&
                mesRegistros == data[i].mes
              ) {
                comidaEntrada = data[i].comidaEntrada;
                comidaEntrada = comidaEntrada.split(':');
                comidaEntrada = comidaEntrada[0] + ':' + comidaEntrada[1];
                this.horaComidaEntrada[data[i].dia - 1] = comidaEntrada;
              }
              if (
                data[i].comidaSalida != undefined &&
                mesRegistros == data[i].mes
              ) {
                comidaSalida = data[i].comidaSalida;
                comidaSalida = comidaSalida.split(':');
                comidaSalida = comidaSalida[0] + ':' + comidaSalida[1];
                this.horaComidaSalida[data[i].dia - 1] = comidaSalida;
              }
            }
            this._unsubInd.next(' ');
          });
        this._unsub.next(' ');
      });
  }

  pdf() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        doc.addImage(img, 'PNG', 100, 20, 400, 650, undefined, 'FAST');
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${this.mes}.pdf`);
      });
  }
  registrar(dni, empresaSelect) {
    let rol: string = '';
    let empresaID;
    if (this.rolSelect == 'Usuario') {
      rol = 'ROLE_USER';
    } else {
      rol = 'ROLE_ADMIN';
    }
    if (dni == '') {
      alert('Inserta un DNI');
    } else {
      this.empresasSE.getAllEmpresas();
      this.empresasSE
        .getEmpresasResult()
        .pipe(takeUntil(this._unsubInd5))
        .subscribe((data) => {
          if (data == null) {
            return;
          }
          console.log(empresaSelect);
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].nombre);
            if (data[i].nombre == empresaSelect) {
              empresaID = data[i].id;
            }
          }
          console.log(empresaID);
          this.empleadoSE.createEmpleado(dni, empresaID, rol);
          this._unsubInd5.next(' ');
        });
    }
  }

  validarDNI(dni, empresa) {
    let dniExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    if (!dniExp.test(this.dni)) {
      this.dniValido = 'false';
      alert('El DNI indicado no es correcto');
    } else {
      let letrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKE';
      let numDNI = this.dni.slice(0, 8);
      let letraDNI = this.dni.slice(8);
      let resto = parseInt(numDNI) % 23;
      let letraCalculada = letrasDNI.charAt(resto);

      if (letraDNI.toUpperCase() == letraCalculada) {
        this.dniValido = 'true';
        this.registrar(dni, empresa);
      } else {
        this.dniValido = 'false';
        alert('El DNI indicado no es correcto');
      }
    }
  }

  fichar() {
    this.router.navigate(['horas/' + this.id]);
  }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];
    //Traduce el mes del ingles al español
    this.mes = new DatePipe(this.localeEs).transform(
      this.fechaTabla,
      'MMMM',
      '',
      'es-ES'
    );
    this.mes = this.mes.charAt(0).toUpperCase() + this.mes.slice(1);

    //Para saber cuantos dias tiene q tener la tabla segun el mes actual
    this.setDias();

    //Rellena el array de los inputs y display para q no de error
    for (let i = 0; i < 32; i++) {
      this.disabledInputs[i] = new Array(6);
      this.display[i] = true;
      for (let j = 0; j < 6; j++) {
        this.disabledInputs[i][j] = false;
      }
    }

    //Imprimir automaticamente los registros que este empleado ya tiene guardados
    this.imprimirRegistros(this.id);

    this.empleadoSE.getEmpleadoAll();
    this.empleadoSE
      .getEmpleadosResult()
      .pipe(takeUntil(this._unsubInd5))
      .subscribe((data) => {
        this.empleados = [];
        if (data == null) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].empresas == null) {
            return;
          }
          if (data[i].empresas.nombre == this.empresa) {
            this.empleados.push(data[i].nombre + ' ' + data[i].apellidos);
          }
        }
        this.empleado = this.empleados[0];
        this.setID(this.empleado);
      });

    //Busca los datos del empleado conectado para ponerlos en el PDF
    this.empleadoSE.getEmpleadoUnico(this.id).subscribe((data) => {
      this.empleadoApellidos = data.apellidos;
      this.empleadoNombre = data.nombre;
      this.empleadoDNI = data.dni;
    });

    //Busca las empresas guardadas en la BBDD y deja seleccionada la preferencia del usuario
    this.empresasSE.getAllEmpresas();
    this.empresasSE
      .getEmpresasResult()
      .pipe(takeUntil(this._unsubInd4))
      .subscribe((data) => {
        if (data == null) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          this.empresas.push(data[i].nombre);
          if (data[i].nombre == this.empresa) {
            this.cif = data[i].cif;
          }
          for (let j = 0; j < data[i].empleado.length; j++) {
            if (data[i].empleado[j].id == this.id) {
              this.empresa = data[i].nombre;
              this.cif = data[i].cif;
            }
          }
        }
        this.empresaSelect = this.empresas[0];
        this._unsubInd4.next(' ');
      });

    //Festivos Nacionales
    this.setFestivos(this.anyo);

    //Deshabilita automaticamente los findes
    this.setFindes();
  }
}
