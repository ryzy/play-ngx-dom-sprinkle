# Angular DOM sprinkling

I.e. applying Angular framework on existing HTML and bootstrapping all component from there on the fly. All AoT friendly.

See working [live demo](https://play-ngx-dom-sprinkle.firebaseapp.com/).

## Inspiration / read

* [Exploring Angular DOM manipulation techniques using ViewContainerRef](https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02)
* [If You Think You Need the Angular 2 Runtime (JIT) Compiler](https://medium.com/@isaacplmann/if-you-think-you-need-the-angular-2-runtime-jit-compiler-2ed4308f7515)
* [Here is what you need to know about dynamic components in Angular](https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e)
* [How to manually bootstrap an Angular application](https://blog.angularindepth.com/how-to-manually-bootstrap-an-angular-application-9a36ccf86429)
* [doc-viewer](https://github.com/angular/angular/tree/master/aio/src/app/layout/doc-viewer) component from Angular.io site project (aio).

## Hacks / workaround

* `@Input`s don't work, have to be manually restored (implemented)
* Content projection works, but `<ng-content select="...">` doesn't (projects everything, no matter what you put in `select` attribute).
* `ComponentFactory` overrides all element attributes (e.g. class), which causes problems if you set anything on Host component (e.g. using @HostBindings).

---

Author: Marcin Ryzycki [@ryzmen](https://twitter.com/ryzmen). Any ideas how to improve it, please give me a shout!
