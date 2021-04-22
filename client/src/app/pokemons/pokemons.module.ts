import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbToastrModule,
  NbTreeGridModule,
  NbThemeModule,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Custom Angular Files
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { ModalComponent } from './main-panel/item-table/modal/modal.component';
import { ItemTableComponent } from './main-panel/item-table/item-table.component';
import { ShowItemComponent } from './main-panel/item-table/show-item/show-item.component';

// Custom Configuration Files

@NgModule({
  declarations: [
    MainPanelComponent,
    ModalComponent,
    ItemTableComponent,
    ShowItemComponent,
  ],
  imports: [
    PokemonsRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbTabsetModule,
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.TOP_RIGHT }),
    NbTreeGridModule,
    NbEvaIconsModule,
  ],
})
export class PokemonsModule { }
