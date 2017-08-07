import { NgWrapperComponent } from './components/ng-wrapper.component';
import { AComponent } from './components/a.component';
import { BComponent } from './components/b.component';
import { MdButton } from '@angular/material';

/**
 * Components that can be embedded in <app-root>
 */
export const embeddedComponents: any[] = [
  NgWrapperComponent,
  AComponent,
  BComponent,
  MdButton,
];

/** Injectable class w/ property returning components that can be embedded */
export class EmbeddedComponents {
  public components: any[] = embeddedComponents;
}
