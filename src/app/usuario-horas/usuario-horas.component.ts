import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MesService } from '../services/api/mes.service';
import { UnsubscribesDestroy } from '../objects/unsubscribesDestroy';
import { takeUntil } from 'rxjs';
import { RegistroService } from '../services/api/registro.service';
import { EmpleadoService } from '../services/api/empleado.service';

@Component({
  selector: 'app-usuario-horas',
  templateUrl: './usuario-horas.component.html',
  styleUrls: ['./usuario-horas.component.css'],
})
export class UsuarioHorasComponent
  extends UnsubscribesDestroy
  implements OnInit
{
  id: number = 0;
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
  diasSemana: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  fechaActual: Date = new Date();
  fechaSelected: Date = new Date(
    '' +
      this.meses[this.fechaActual.getMonth()] +
      ' 1,' +
      this.fechaActual.getFullYear()
  );
  dia: number = this.fechaActual.getDate();
  mes: string = this.mesesES[this.fechaActual.getMonth()];
  anyo: number = this.fechaActual.getFullYear();
  diaSemana: string = this.diasSemana[this.fechaActual.getDay()];
  dias: number[] = [];

  horaEntrada: string = '';
  horaAlmuerzoEntrada: string = '';
  horaAlmuerzoSalida: string = '';
  horaComidaEntrada: string = '';
  horaComidaSalida: string = '';
  horaSalida: string = '';

  mostrarBoton: boolean = false;

  constructor(
    private rutaActiva: ActivatedRoute,
    private mesSE: MesService,
    private registroSE: RegistroService,
    private empleadoSE: EmpleadoService,
    private router: Router
  ) {
    super();
  }

  setDias() {
    if (
      this.fechaSelected.getMonth() == 0 ||
      this.fechaSelected.getMonth() == 2 ||
      this.fechaSelected.getMonth() == 4 ||
      this.fechaSelected.getMonth() == 6 ||
      this.fechaSelected.getMonth() == 7 ||
      this.fechaSelected.getMonth() == 9 ||
      this.fechaSelected.getMonth() == 11
    ) {
      this.dias = new Array(31);
      for (let i = 0; i < this.dias.length; i++) {
        let num = 1;
        this.dias[i] = num + i;
      }
    } else if (this.fechaSelected.getMonth() == 1) {
      if (
        (this.fechaSelected.getFullYear() % 4 == 0 &&
          this.fechaSelected.getFullYear() % 100 != 0) ||
        this.fechaSelected.getFullYear() % 400 == 0
      ) {
        this.dias = new Array(29);
        for (let i = 0; i < this.dias.length; i++) {
          let num = 1;
          this.dias[i] = num + i;
        }
      } else {
        this.dias = new Array(28);
        for (let i = 0; i < this.dias.length; i++) {
          let num = 1;
          this.dias[i] = num + i;
        }
      }
    } else {
      this.dias = new Array(30);
      for (let i = 0; i < this.dias.length; i++) {
        let num = 1;
        this.dias[i] = num + i;
      }
    }
  }

  setEntrada() {
    this.fechaActual = new Date();
    let h =
      String(this.fechaActual.getHours()).length < 2
        ? '0' + this.fechaActual.getHours()
        : this.fechaActual.getHours();
    let m =
      String(this.fechaActual.getMinutes()).length < 2
        ? '0' + this.fechaActual.getMinutes()
        : this.fechaActual.getMinutes();
    let hora = h + ':' + m;
    this.horaEntrada = hora;
    this.guardar();
  }
  setAlmuerzoEntrada() {
    this.fechaActual = new Date();
    let h =
      String(this.fechaActual.getHours()).length < 2
        ? '0' + this.fechaActual.getHours()
        : this.fechaActual.getHours();
    let m =
      String(this.fechaActual.getMinutes()).length < 2
        ? '0' + this.fechaActual.getMinutes()
        : this.fechaActual.getMinutes();
    let hora = h + ':' + m;
    this.horaAlmuerzoEntrada = hora;
    this.guardar();
  }
  setAlmuerzoSalida() {
    this.fechaActual = new Date();
    let h =
      String(this.fechaActual.getHours()).length < 2
        ? '0' + this.fechaActual.getHours()
        : this.fechaActual.getHours();
    let m =
      String(this.fechaActual.getMinutes()).length < 2
        ? '0' + this.fechaActual.getMinutes()
        : this.fechaActual.getMinutes();
    let hora = h + ':' + m;
    this.horaAlmuerzoSalida = hora;
    this.guardar();
  }
  setComidaEntrada() {
    this.fechaActual = new Date();
    let h =
      String(this.fechaActual.getHours()).length < 2
        ? '0' + this.fechaActual.getHours()
        : this.fechaActual.getHours();
    let m =
      String(this.fechaActual.getMinutes()).length < 2
        ? '0' + this.fechaActual.getMinutes()
        : this.fechaActual.getMinutes();
    let hora = h + ':' + m;
    this.horaComidaEntrada = hora;
    this.guardar();
  }
  setComidaSalida() {
    this.fechaActual = new Date();
    let h =
      String(this.fechaActual.getHours()).length < 2
        ? '0' + this.fechaActual.getHours()
        : this.fechaActual.getHours();
    let m =
      String(this.fechaActual.getMinutes()).length < 2
        ? '0' + this.fechaActual.getMinutes()
        : this.fechaActual.getMinutes();
    let hora = h + ':' + m;
    this.horaComidaSalida = hora;
    this.guardar();
  }
  setSalida() {
    this.fechaActual = new Date();
    let h =
      String(this.fechaActual.getHours()).length < 2
        ? '0' + this.fechaActual.getHours()
        : this.fechaActual.getHours();
    let m =
      String(this.fechaActual.getMinutes()).length < 2
        ? '0' + this.fechaActual.getMinutes()
        : this.fechaActual.getMinutes();
    let hora = h + ':' + m;
    this.horaSalida = hora;
    this.guardar();
  }

  crearMes() {
    let fecha: string = `${this.fechaSelected.getFullYear()}-${
      String(this.fechaSelected.getMonth()).length < 2
        ? '0' + String(this.fechaSelected.getMonth() + 1)
        : String(this.fechaSelected.getMonth() + 1)
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

  setAnyo(anyo: number) {
    this.fechaSelected = new Date(
      '' + (this.mesesES.indexOf(this.mes) + 1) + ' 1,' + anyo
    );
    this.crearMes();
    this.setDias();
    this.imprimirRegistros(this.id);
  }

  setMesTabla(mes: string) {
    this.horaEntrada = '';
    this.horaAlmuerzoEntrada = '';
    this.horaAlmuerzoSalida = '';
    this.horaComidaEntrada = '';
    this.horaComidaSalida = '';
    this.horaSalida = '';
    this.fechaSelected = new Date(
      '' +
        (this.mesesES.indexOf(mes) + 1) +
        ' 1,' +
        this.fechaActual.getFullYear()
    );

    this.crearMes();
    this.setDias();
    this.imprimirRegistros(this.id);
  }

  setDiaTabla() {
    this.horaEntrada = '';
    this.horaAlmuerzoEntrada = '';
    this.horaAlmuerzoSalida = '';
    this.horaComidaEntrada = '';
    this.horaComidaSalida = '';
    this.horaSalida = '';
    this.fechaSelected = new Date(
      '' +
        (this.mesesES.indexOf(this.mes) + 1) +
        ' ' +
        this.dia +
        ',' +
        this.fechaActual.getFullYear()
    );
    this.diaSemana = this.diasSemana[this.fechaSelected.getDay()];
    this.imprimirRegistros(this.id);
  }

  imprimirRegistros(id) {
    this.horaEntrada = '';
    this.horaAlmuerzoEntrada = '';
    this.horaAlmuerzoSalida = '';
    this.horaComidaEntrada = '';
    this.horaComidaSalida = '';
    this.horaSalida = '';
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
              if (
                data[i].entrada != undefined &&
                mesRegistros == data[i].mes &&
                data[i].dia == this.dia
              ) {
                entrada = data[i].entrada;
                entrada = entrada.split(':');
                entrada = entrada[0] + ':' + entrada[1];
                this.horaEntrada = entrada;
              }
              if (
                data[i].salida != undefined &&
                mesRegistros == data[i].mes &&
                data[i].dia == this.dia
              ) {
                salida = data[i].salida;
                salida = salida.split(':');
                salida = salida[0] + ':' + salida[1];
                this.horaSalida = salida;
              }
              if (
                data[i].almuerzoEntrada != undefined &&
                mesRegistros == data[i].mes &&
                data[i].dia == this.dia
              ) {
                almuerzoEntrada = data[i].almuerzoEntrada;
                almuerzoEntrada = almuerzoEntrada.split(':');
                almuerzoEntrada = almuerzoEntrada[0] + ':' + almuerzoEntrada[1];
                this.horaAlmuerzoEntrada = almuerzoEntrada;
              }
              if (
                data[i].almuerzoSalida != undefined &&
                mesRegistros == data[i].mes &&
                data[i].dia == this.dia
              ) {
                almuerzoSalida = data[i].almuerzoSalida;
                almuerzoSalida = almuerzoSalida.split(':');
                almuerzoSalida = almuerzoSalida[0] + ':' + almuerzoSalida[1];
                this.horaAlmuerzoSalida = almuerzoSalida;
              }
              if (
                data[i].comidaEntrada != undefined &&
                mesRegistros == data[i].mes &&
                data[i].dia == this.dia
              ) {
                comidaEntrada = data[i].comidaEntrada;
                comidaEntrada = comidaEntrada.split(':');
                comidaEntrada = comidaEntrada[0] + ':' + comidaEntrada[1];
                this.horaComidaEntrada = comidaEntrada;
              }
              if (
                data[i].comidaSalida != undefined &&
                mesRegistros == data[i].mes &&
                data[i].dia == this.dia
              ) {
                comidaSalida = data[i].comidaSalida;
                comidaSalida = comidaSalida.split(':');
                comidaSalida = comidaSalida[0] + ':' + comidaSalida[1];
                this.horaComidaSalida = comidaSalida;
              }
            }
            this._unsubInd.next(' ');
          });
        this._unsub.next(' ');
      });
  }

  guardar() {
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
            if (value[i].dia == this.dia && mesID == value[i].mes) {
              let entrada = this.horaEntrada == '' ? null : this.horaEntrada;
              let salida = this.horaSalida == '' ? null : this.horaSalida;
              let almuerzoEntrada =
                this.horaAlmuerzoEntrada == ''
                  ? null
                  : this.horaAlmuerzoEntrada;
              let almuerzoSalida =
                this.horaAlmuerzoSalida == '' ? null : this.horaAlmuerzoSalida;
              let comidaEntrada =
                this.horaComidaEntrada == '' ? null : this.horaComidaEntrada;
              let comidaSalida =
                this.horaComidaSalida == '' ? null : this.horaComidaSalida;
              let dia = this.dia;

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
            let mes = data[0].id;
            let entrada = this.horaEntrada == '' ? null : this.horaEntrada;
            let salida = this.horaSalida == '' ? null : this.horaSalida;
            let almuerzoEntrada =
              this.horaAlmuerzoEntrada == '' ? null : this.horaAlmuerzoEntrada;
            let almuerzoSalida =
              this.horaAlmuerzoSalida == '' ? null : this.horaAlmuerzoSalida;
            let comidaEntrada =
              this.horaComidaEntrada == '' ? null : this.horaComidaEntrada;
            let comidaSalida =
              this.horaComidaSalida == '' ? null : this.horaComidaSalida;
            let dia = this.dia;

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
    // this.imprimirRegistros(this.id);
  }

  mostrarOcultarBoton() {
    this.empleadoSE.getEmpleadoUnico(this.id).subscribe((data) => {
      console.log(data);
      console.log(data.roles[0]);
      if (data.roles[0] == 'ROLE_ADMIN') {
        this.mostrarBoton = true;
      } else {
        this.mostrarBoton = false;
      }
    });
  }
  volver() {
    this.router.navigate(['reporting/' + this.id]);
  }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];
    this.setDias();
    this.crearMes();
    this.imprimirRegistros(this.id);
    this.mostrarOcultarBoton();
  }
}
