import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'a-component',
  host: { 'class': 'component-wrapper' },
  template: `
    <h3>Component A</h3>
    @Input prop: {{ prop }}
  `,
})
export class AComponent implements AfterViewInit {
  @Input() prop: string;

  public ngAfterViewInit(): void {
  }
}
