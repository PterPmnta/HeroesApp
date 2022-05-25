import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    this.heroesService.guardarHeroe(this.heroe).subscribe((resp) => {
      console.log('respuesta', resp);
    });
  }
}
