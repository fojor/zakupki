import { Component } from "@angular/core";
import { TasksListComponent } from '../../pages/tasks/list/tasks-list.component';
import { PurchasesListComponent } from '../../pages/purchases/list/purchases-list.component';
import { SettingsListComponent } from '../../pages/settings/list/settings-list.component';
import { CalendarComponent } from 'src/app/pages/calendar/calendar.component';

@Component({
    selector: 'ons-page[tabs]',
    templateUrl: './tabs.component.html'
})
  
export class TabsComponent {
  tasks = TasksListComponent;
  calendar = CalendarComponent;
  purchases = PurchasesListComponent;
  settings = SettingsListComponent;
}