import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, NavBarComponent, FontAwesomeModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  data: any;
  constructor(private dataService: DataService, public auth: AuthService) {}

  ngOnInit() {
    this.dataService.data.subscribe(events => {
  
      this.calendarOptions = { ...this.calendarOptions, events };
    });
  }}