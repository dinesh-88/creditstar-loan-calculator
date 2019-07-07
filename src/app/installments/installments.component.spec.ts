import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsComponent } from './installments.component';
import { ApplicationSharedModuleModule } from '../application-shared-module/application-shared-module.module';

describe('InstallmentsComponent', () => {
  let component: InstallmentsComponent;
  let fixture: ComponentFixture<InstallmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallmentsComponent ],
      imports: [
        ApplicationSharedModuleModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
