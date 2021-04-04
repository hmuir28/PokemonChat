import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbDialogService,
} from '@nebular/theme';
import { Subscription } from 'rxjs';

import { ShowItemComponent } from './show-item/show-item.component';
import { IPokemonsResponse, PokemonService } from '../../services/pokemon';
import Pokemon from '../../models/pokemon';

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

  pokemonsSubscription!: Subscription;
  sortColumn!: string;
  sortDirection: NbSortDirection;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Pokemon>,
    private dialogService: NbDialogService,
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
    // Hack implemented due to the DialogService since it didn't pass
    // the values through the context object parameter.
    ShowItemComponent.prototype.pokemon = pokemon;
    this.dialogService.open(ShowItemComponent);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }
}
