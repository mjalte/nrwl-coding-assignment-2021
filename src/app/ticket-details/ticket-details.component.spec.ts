import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsComponent } from './ticket-details.component';

import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from '../backend.service';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  let mockActivatedRoute, mockBackendService;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({
        get: () => {
          return 0;
        },
      }),
    };

    mockBackendService = jasmine.createSpyObj([
      'currentTicket',
      'user',
      'ticket',
      'users',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
      imports: [
        RouterTestingModule,
        MatListModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: BackendService, useValue: mockBackendService },
      ],
    }).compileComponents();

    let user = { id: 111, name: 'Victor' };
    let ticket = {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false,
    };

    mockBackendService.currentTicket.and.returnValue(of(ticket));
    mockBackendService.ticket.and.returnValue(of(ticket));
    mockBackendService.user.and.returnValue(of(user));
    mockBackendService.users.and.returnValue(of([user]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ticket 0', () => {
    fixture.detectChanges();
    expect(component.ticketId).toEqual(0);
  });

  it('should have user Victor', () => {
    fixture.detectChanges();
    expect(component.userId).toEqual(111);
  });
});
