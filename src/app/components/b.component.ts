import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'b-component',
  host: { 'class': 'component-wrapper' },
  template: `
    <h3>Component B</h3>
    B component content here... with A component inside too!
    <a-component prop="prop-value"></a-component>
  `,
})
export class BComponent implements AfterViewInit {
  public ngAfterViewInit(): void {
  }
}
