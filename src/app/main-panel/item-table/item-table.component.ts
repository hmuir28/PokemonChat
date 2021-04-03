import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { PokemonService } from '../../services/pokemon';
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
  customColumn = 'name';
  data: TreeNode<Pokemon>[] = [];
  defaultColumns = [ 'url' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<Pokemon>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  pokemonsSubscription!: Subscription;
  selectedPokemon!: Pokemon;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Pokemon>,
    private pokemonService: PokemonService,
  ) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit() {
    this.pokemonsSubscription = this.pokemonService.getPokemons()
      .subscribe(({ results: pokemons }) => {
        this.data = pokemons.map(pokemon => ({ data: { ...pokemon } }));
        this.dataSource.setData(this.data);
      });
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

  selectItem(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }
}
