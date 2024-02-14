import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PreguntaTrivial } from 'src/app/interfaces/pregunta-trivial';
import { TrivialService } from 'src/app/services/trivial.service';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.page.html',
  styleUrls: ['./trivial.page.scss'],
})
export class TrivialPage implements OnInit {

  preguntas:PreguntaTrivial[] = [];
  pregunta:PreguntaTrivial= {} as PreguntaTrivial ;
  respuestas:string[] = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];

  constructor(private trivialSvc: TrivialService, private datePipe:DatePipe) { }

  ngOnInit() {
  }

  responder(r:string){
    console.log('Has respondido con la opcion: ' + r )
  }

}
 