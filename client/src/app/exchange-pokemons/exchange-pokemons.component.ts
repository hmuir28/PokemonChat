import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { localStorageKeys, messageStatus, routes } from '../util/constants';
import { FirebaseService } from '../services/firebase.service';

const { error } = messageStatus;

@Component({
  selector: 'app-exchange-pokemons',
  templateUrl: './exchange-pokemons.component.html',
  styleUrls: ['./exchange-pokemons.component.scss']
})
export class ExchangePokemonsComponent implements OnInit {  
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
