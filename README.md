# Packaging Angular libraries with ng-packagr

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square)](https://renovateapp.com/)
[![CircleCI](https://img.shields.io/circleci/project/github/dherges/ng-packaged/master.svg?style=flat-square&label=Circle%20CI)](https://circleci.com/gh/dherges/ng-packaged)


> Angular libraries are fun!

This repository is an example how to set-up an Angular library project.

It features the `@my/lib` library package: `@my/lib` is packaged with [ng-packagr](https://github.com/dherges/ng-packagr) and then imported into an Angular CLI app.
To run the example, do the following steps:

```bash
$ yarn install
$ yarn build:lib
$ ng serve
```

Here are instructions how this demo was created.


#### Install

Set up an Angular CLI project, add `ng-packagr`:

```bash
$ ng new ng-packaged
$ yarn add --dev ng-packagr
```


#### Create Library

Create a library in `my-lib`.
It's recommended to provide a single `public_api.ts` as the entry point to your library.


#### Add Build Script and Configuration

In root `package.json`:

```json
{
  "name": "ng-packaged",
  "scripts": {
    "build:lib": "ng-packagr"
  }
}
```

It picks up a configuration in `ng-package.json`:

```json
{
  "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
  "src": "my-lib",
  "dest": "dist/my-lib",
  "workingDirectory": ".ng_build",
  "lib": {
    "entryFile": "my-lib/src/public_api.ts"
  }
}
```

ng-packagr comes with built-in support for [autoprefixer](https://github.com/postcss/autoprefixer) and [postcss](https://github.com/postcss/postcss).
It uses [browserslist](https://github.com/ai/browserslist) to determine which browser versions should be supported.
Create the file `my-lib/.browserslistrc`:

```
last 2 Chrome versions
iOS > 10
Safari > 10
```


#### Build

Now, build your library:

```bash
$ yarn build:lib
```


#### Show off in Demo App

First, in `.angular-cli.json` set `outDir` of the Angular CLI app, so that it does not conflict with output directory of your library!

```json
{
  "project": {
    "name": "ng-packaged"
  },
  "apps": [
    {
      "root": "src",
      "outDir": "dist/app",
      /* ... */
    }
  ]
}
```


Then, in `tsconfig.app.json`, map the TypeScript import path:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "paths": {
      "@my/lib": [ "../dist/my-lib" ]
    }
  }
}
```

Finally, include in your application.
In `app.module.ts`:

```ts
import { MyLibModule } from '@my/lib';

@NgModule({
  imports: [
    /* .. */
    MyLibModule.forRoot()
  ],
})
export class AppModule { }
```

And use them in components like `app.component.ts`:

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BarService } from '@my/lib';

@Component({
  selector: 'app-root',
  template: `
<my-foo></my-foo>
<hr>
<marquee>{{ value$ | async }}</marquee>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  value$: Observable<string>;

  constructor (
    bar: BarService
  ) {
     this.value$ = bar.value;
  }

}
```
