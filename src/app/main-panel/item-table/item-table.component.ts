import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbDialogService,
} from '@nebular/theme';
import { Subscription } from 'rxjs';

import { IPokemonsResponse, PokemonService } from '../../services/pokemon';
import Pokemon from '../../models/pokemon';
import { ModalService } from './modal/modal.service';

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
export class ItemTableComponent implements OnInit, OnDestroy {
  customColumn: string;
  data: TreeNode<Pokemon>[];
  defaultColumns: string[];

  allColumns: any;

  dataSource: NbTreeGridDataSource<Pokemon>;

  loading: boolean;

  // TODO: Future implementation for infinite scroll
  next!: string;

  pokemon!: Pokemon;
  pokemonsSubscription!: Subscription;
  sortColumn!: string;
  sortDirection: NbSortDirection;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Pokemon>,
    private modalService: ModalService,
    private pokemonService: PokemonService,
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
    this.pokemonsSubscription = this.pokemonService.getPokemons()
      .subscribe(this.handlePokemons.bind(this));
  }

  ngOnDestroy() {
    this.pokemonsSubscription.unsubscribe();
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
