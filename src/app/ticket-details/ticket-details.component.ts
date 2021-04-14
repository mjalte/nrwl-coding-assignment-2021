import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Ticket, User, BackendService } from '../backend.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  ticketId: number;
  ticket$: Observable<Ticket>;
  routeParams$: Observable<Ticket>;
  user$: Observable<User>;
  users$: Observable<User[]>;
  userId: number;

  constructor(private route: ActivatedRoute, private backend: BackendService) {}

  ngOnInit(): void {
    this.ticket$ = this.backend.currentTicket().pipe(
      tap((ticket) => {
        this.userId = ticket.assigneeId;
        this.user$ = this.backend.user(ticket.assigneeId);
      })
    );

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.ticketId = Number(params.get('id'));
          return this.backend.ticket(this.ticketId);
        })
      )
      .subscribe();

    this.users$ = this.backend.users();
  }

  complete(completed: boolean) {
    this.backend.complete(this.ticketId, completed).subscribe();
  }

  assign() {
    this.backend.assign(this.ticketId, this.userId).subscribe();
  }
}
