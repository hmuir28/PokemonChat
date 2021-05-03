import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

import Pokemon from '../../../models/pokemon';
import { WebSocketService } from '../../../services/websocket.service';
import PokemonDetails from '../../../models/pokemon-details';

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
export class ItemTableComponent implements OnChanges {
  @Input()
  isPokemonListCustom?: boolean;
  
  @Input()
  pokemons: Pokemon[] = [];

  allColumns: any;
  customColumn: string = '';
  data: TreeNode<Pokemon>[];
  dataSource: NbTreeGridDataSource<Pokemon>;
  defaultColumns: string[];

  loading: boolean;

  // TODO: Future implementation for infinite scroll
  next?: string;

  @Output()
  pokemonSelectionEvent = new EventEmitter<PokemonDetails>();

  sortColumn!: string;
  sortDirection: NbSortDirection;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Pokemon>,
    private ws: WebSocketService,
  ) {
    this.defaultColumns = [];
    
    this.loading = false;

    this.data = [];
    this.dataSource = this.dataSourceBuilder.create(this.data);
    this.sortDirection = NbSortDirection.NONE;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const change in changes) {
      if (changes.hasOwnProperty(change) && changes[change].currentValue) {
        this.handlePokemonListChanges();
      }
    }
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

  handlePokemonListChanges() {
    // @todo add <this.next = next;> when the virtual scroll is added.
    this.setColumnsHeader();
    this.data = this.pokemons
      .map((pokemon: any) => ({ data: {
        ...pokemon,
        name: pokemon.name,
        moreDetailUrl: pokemon.url || pokemon.moreDetailUrl,
      } }));
    this.dataSource.setData(this.data);
    // @todo move the websockets connection out of this method <this.ws.open(() => {})>
  }

  selectItem(pokemon: PokemonDetails) {
    this.pokemonSelectionEvent.emit(pokemon);
  }

  setColumnsHeader() {
    if (this.isPokemonListCustom) {
      this.customColumn = 'displayName';
    } else {
      this.customColumn = 'name';
    }

    this.defaultColumns = ['moreDetailUrl'];
    this.allColumns = [this.customColumn, ...this.defaultColumns];
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }
}
