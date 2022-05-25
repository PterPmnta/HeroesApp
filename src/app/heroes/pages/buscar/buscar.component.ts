import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
    `
      .size-card {
        max-width: 400px;
      }
      .divHeroe {
        min-height: 700px;
      }
    `,
  ],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;
  busqueda: boolean = true;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencia(this.termino.trim())
      .subscribe((heroes) => {
        if (heroes.length > 0) {
          this.heroes = heroes;
        }
      });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroe(heroe.id!).subscribe((heroe) => {
      this.heroeSeleccionado = heroe;
    });
  }
}
