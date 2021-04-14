import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsComponent } from './ticket-details.component';

import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from '../backend.service';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
      imports: [RouterTestingModule],
      providers: [BackendService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
