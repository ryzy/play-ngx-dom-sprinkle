/**
 * Code based on `doc-viewer` component from Angular.io site
 * @url https://github.com/angular/angular/tree/master/aio/src/app/layout/doc-viewer
 */

import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef,
  DoCheck, ElementRef, Injector, OnDestroy,
} from '@angular/core';

import { EmbeddedComponents } from './embedded-components';

export interface DocumentContent {
  /** The unique identifier for this document */
  id: string;
  /** The HTML to display  */
  contents: string;
}

interface EmbeddedComponentFactory {
  contentPropertyName: string;
  factory: ComponentFactory<any>;
}

const initialElement = document.querySelector('app-root');
const initialContent = initialElement ? initialElement.innerHTML : 'ERROR: app-root content not found';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent implements DoCheck, OnDestroy {
  private embeddedComponents: ComponentRef<any>[] = [];
  private embeddedComponentFactories: Map<string, EmbeddedComponentFactory> = new Map();
  private hostElement: HTMLElement;

  constructor(
    private injector: Injector,
    componentFactoryResolver: ComponentFactoryResolver,
    elementRef: ElementRef,
    embeddedComponents: EmbeddedComponents,
  ) {
    this.hostElement = elementRef.nativeElement;
    this.hostElement.innerHTML = initialContent;

    for (const component of embeddedComponents.components) {
      const factory: ComponentFactory<any> = componentFactoryResolver.resolveComponentFactory(component);
      const selector: string = factory.selector;
      const contentPropertyName: string = this.selectorToContentPropertyName(selector);
      this.embeddedComponentFactories.set(selector, { contentPropertyName, factory });
    }

    this.build({ id: 'id', contents: initialContent });
  }

  // @Input()
  // set (newDoc: DocumentContent) {
  //   this.ngOnDestroy();
  //   if (newDoc) {
  //     this.build(newDoc);
  //   }
  // }

  /**
   * Add doc content to host element and build it out with embedded components
   */
  private build(doc: DocumentContent) {

    // security: the doc.content is always authored by the documentation team
    // and is considered to be safe
    this.hostElement.innerHTML = doc.contents || '';

    if (!doc.contents) { return; }

    // TODO(i): why can't I use for-of? why doesn't typescript like Map#value() iterators?
    this.embeddedComponentFactories.forEach(({ contentPropertyName, factory }, selector) => {
      const embeddedComponentElements = this.hostElement.querySelectorAll(selector);

      // cast due to https://github.com/Microsoft/TypeScript/issues/4947
      for (const element of embeddedComponentElements as any as HTMLElement[]){
        // hack: preserve the current element content because the factory will empty it out
        // element[contentPropertyName] = element.innerHTML;

        // hack: preserve current element attributes and re-set them after factory created the component
        const elementAttributes = Object.values(element.attributes);
        // hack: prepare nodes to project (if any), because the factory will empty it out
        const nodes: HTMLElement[] = Object.values(element.childNodes);

        // Create the component
        const cmpRef: ComponentRef<any> = factory.create(this.injector, [nodes], element);

        // Restore attributes on component instance.
        // With this, we have semi-working @Input properties.
        elementAttributes.forEach((attr: Attr) => {
          cmpRef.instance[attr.name] = attr.value;
        });

        // console.log('created cmp for selector', {
        //   element,
        //   elementAttributes,
        //   selector,
        //   contentPropertyName,
        //   cmpRef,
        //   instance: cmpRef.instance,
        // });
        this.embeddedComponents.push(cmpRef);
      }
    });
  }

  ngDoCheck() {
    this.embeddedComponents.forEach(comp => comp.changeDetectorRef.detectChanges());
  }

  ngOnDestroy() {
    // destroy these components else there will be memory leaks
    this.embeddedComponents.forEach(comp => comp.destroy());
    this.embeddedComponents.length = 0;
  }

  /**
   * Compute the component content property name by converting the selector to camelCase and appending
   * 'Content', e.g. live-example => liveExampleContent
   */
  private selectorToContentPropertyName(selector: string) {
    return selector.replace(/-(.)/g, (match, $1) => $1.toUpperCase()) + 'Content';
  }
}
