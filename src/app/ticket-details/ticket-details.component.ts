import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ticket, BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  ticketId: number;
  ticket$: Observable<Ticket>;
  
  constructor(private route: ActivatedRoute, private backend: BackendService) {}

  ngOnInit(): void {
    this.ticket$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.ticketId = Number(params.get('id'));
        return this.backend.ticket(this.ticketId);
      })
    );
  }
}
