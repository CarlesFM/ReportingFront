import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Festivo } from 'src/app/objects/Festivo';

@Injectable({
  providedIn: 'root',
})
export class FestivoService {
  private festivos = new BehaviorSubject<Array<Festivo> | null>(null);

  constructor(private http: HttpClient) {}

  getAllFestivos(anyo) {
    this.festivos = new BehaviorSubject<Array<Festivo> | null>(null);

    this.http
      .get('https://date.nager.at/api/v3/publicholidays/' + anyo + '/ES')
      .subscribe((data) => {
        let festivo: Array<Festivo> = [];
        let fes: Festivo;
        data['forEach']((element) => {
          if (element.counties != null) {
            for (let i = 0; i < element.counties.length; i++) {
              if (element.counties[i] == 'ES-VC') {
                fes = Festivo.convertFrontObject(element);
                festivo.push(fes);
              }
            }
          } else {
            fes = Festivo.convertFrontObject(element);
            festivo.push(fes);
          }
        });
        this.festivos.next(festivo);
      });
  }

  getResultFestivos() {
    return this.festivos;
  }
}
