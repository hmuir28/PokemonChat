import { Component, OnInit } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

import { IPokemonsResponse, PokemonService } from '../../services/pokemon.service';
import Pokemon from '../../models/pokemon';
import { ModalService } from './modal/modal.service';
import { WebSocketService } from 'src/app/services/websocket.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {
  customColumn: string;
  data: TreeNode<Pokemon>[];
  defaultColumns: string[];

  allColumns: any;

  dataSource: NbTreeGridDataSource<Pokemon>;

  loading: boolean;

  // TODO: Future implementation for infinite scroll
  next!: string;

  pokemon!: Pokemon;
  sortColumn!: string;
  sortDirection: NbSortDirection;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Pokemon>,
    private modalService: ModalService,
    private pokemonService: PokemonService,
    private ws: WebSocketService,
  ) {
    this.customColumn = 'name';
    this.defaultColumns = [ 'url' ];
    
    this.allColumns = [ this.customColumn, ...this.defaultColumns ];

    this.loading = false;

    this.data = [];
    this.dataSource = this.dataSourceBuilder.create(this.data);
    this.sortDirection = NbSortDirection.NONE;
  }

  ngOnInit() {
    this.handleOnInit();
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  handleOnInit() {
    // TODO: Add logger to track FE ws issues
    this.pokemonService.getPokemons()
      .then(this.handlePokemons.bind(this))
      .then(() => this.ws.open(() => {}));
  }

  handlePokemons({ next, results: pokemons }: IPokemonsResponse) {
    this.next = next;
    this.data = pokemons.map((pokemon: any) => ({ data: { ...pokemon } }));
    this.dataSource.setData(this.data);
  }

  selectItem(pokemon: Pokemon) {
    this.pokemon = pokemon;
    this.modalService.open('item-modal');
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }
}
