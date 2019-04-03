import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OnsenModule } from 'ngx-onsenui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './redux/app.reducers';
import { effects } from './redux/app.effects';

import { AppComponent } from './app.component';
import { TasksListComponent } from './pages/tasks/list/tasks-list.component';
import { PurchasesListComponent } from './pages/purchases/list/purchases-list.component';
import { SettingsListComponent } from './pages/settings/list/settings-list.component';
import { EditTaskComponent } from './pages/tasks/edit/edit-task.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EditCategoryComponent } from './pages/tasks/edit/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TasksListComponent, 
    CalendarComponent,
    PurchasesListComponent, 
    SettingsListComponent,
    EditTaskComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  entryComponents: [
    TabsComponent,
    TasksListComponent, 
    CalendarComponent,
    PurchasesListComponent, 
    SettingsListComponent,
    EditTaskComponent,
    EditCategoryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
