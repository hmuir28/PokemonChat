import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

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
export class ItemTableComponent implements OnChanges {
  @Input()
  isPokemonListCustom?: boolean;
  
  @Input()
  pokemons: Pokemon[] = [];

  customColumn: string = '';
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
    /* @todo add <this.next = next;> when the virtual scroll is added. */
    this.setColumnsHeader();
    this.data = this.pokemons.map((pokemon: any) => ({ data: { ...pokemon } }));
    this.dataSource.setData(this.data);
    // @todo move the websockets connection out of this method <this.ws.open(() => {})>
  }

  selectItem(pokemon: Pokemon) {
    this.pokemon = pokemon;
    this.modalService.open('item-modal');
  }

  setColumnsHeader() {
    if (this.isPokemonListCustom) {
      this.customColumn = 'displayName';
      this.defaultColumns = ['moreDetailUrl'];
    } else {
      this.customColumn = 'name';
      this.defaultColumns = ['url'];
    }

    this.allColumns = [this.customColumn, ...this.defaultColumns];
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }
}
