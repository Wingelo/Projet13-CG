import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTalkjsComponent } from './chat-talkjs.component';

describe('ChatTalkjsComponent', () => {
  let component: ChatTalkjsComponent;
  let fixture: ComponentFixture<ChatTalkjsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatTalkjsComponent]
    });
    fixture = TestBed.createComponent(ChatTalkjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
