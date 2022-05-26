import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
        height: 100vh;
        object-fit: none;
      }
    `,
  ],
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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroe(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((heroUpdated) => {
          console.log(this.mostrarSnackBar('Heroe actualizado'));
        });
    } else {
      this.heroesService.guardarHeroe(this.heroe).subscribe((heroSaved) => {
        this.router.navigate(['/heroes/editar', heroSaved.id]);
        this.mostrarSnackBar('Heroe creado/registrado');
      });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.eliminarHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
