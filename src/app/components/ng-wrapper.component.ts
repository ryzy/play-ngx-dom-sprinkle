import { Component } from '@angular/core';

@Component({
  selector: 'ng-wrapper',
  host: { 'class': 'component-wrapper' },
  template: `
    <h3>NG Wrapper component</h3>
    Projected content: <ng-content></ng-content>
  `,
})
export class NgWrapperComponent {
}
