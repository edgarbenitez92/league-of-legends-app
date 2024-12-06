import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from 'src/app/core/configs/translate-module.config';
import { AboutComponent } from './about.component';

class FakeRouter {
  navigate() { }
}

fdescribe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [HttpClientModule, TranslateModule.forRoot(translateModuleConfig)],
      providers: [{ provide: Router, useClass: FakeRouter }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('It should navigate to home screen', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalledWith(['/dashboard/home']);
  });

  it('it should contain "blank", all targets attr in the labels <a>', () => {
    const blankNavigationLinks: any = fixture.debugElement.queryAll(By.css('a'));
    for (let navigationLink of blankNavigationLinks) {
      expect(navigationLink['attributes'].target).toContain('/blank');
    }
  });

  it('it should exist all <a> labels with the target "blank"', () => {
    const blankNavigationLinks: any = fixture.debugElement.queryAll(By.css('a'));
    let linksToNavigate = 0;

    for (let navigationLink of blankNavigationLinks) {
      if (navigationLink['attributes'].target === '/blank') linksToNavigate += 1;
    }

    expect(linksToNavigate).toBe(6);
  });

  it('it should navigate to the linkedIn profile', () => {
    const linkedInNavigation: any = fixture.debugElement.query(By.css('a'));
    const linkedInHrefAttr = linkedInNavigation.attributes['href'];
    const linkedInPath = 'https://www.linkedin.com/in/edgar-benítez-valera-a191b0105';
    const correctPath: boolean = linkedInHrefAttr.includes(linkedInPath);
    expect(correctPath).toBeTruthy();
  });

  it('it should navigate to the repository route', () => {
    const githubNavigation: any = fixture.debugElement.queryAll(By.css('a'));
    const githubHrefAttr = githubNavigation[5].attributes['href'];
    const githubPath = 'https://github.com/edgarbenitez92/league-of-legends-app';
    const correctPath: boolean = githubHrefAttr.includes(githubPath);
    expect(correctPath).toBeTruthy();
  });
});
