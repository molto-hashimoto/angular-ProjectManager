import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReconfirmDialogComponent } from './delete-reconfirm-dialog.component';

describe('DeleteReconfirmDialogComponent', () => {
  let component: DeleteReconfirmDialogComponent;
  let fixture: ComponentFixture<DeleteReconfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReconfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReconfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
