import { Component, OnInit , OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map , filter} from 'rxjs/internal/operators';
import { Subscriber, Subscription } from 'rxjs';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {


    this.subscription = this.regresaObservable()
    .subscribe(
      numero => {
        console.log('obs', numero);
      },
      error => {
        console.log('error en obs', error);
      },
      () => {
        console.log('el obs terminó');
      }
    );


  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        /*if (contador === 3) {
          clearInterval(interval);
          observer.complete();
        }*/
        /*if (contador === 2) {
          observer.error('Error osbs ');
        }*/
      },1000);
    }).pipe(
      map( resp => {
        return resp.valor;
      } ),
      filter( (valor, index) => {
        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
