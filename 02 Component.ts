// Angular applications are made up of components.
// A component is the combination of an HTML template and a component class that controls a portion of the screen.

// Components are responsible for rendering the UI by combining the template and data.
// They bind data from the component's class to the template, allowing dynamic rendering of content.

// Components handle user interactions and respond to events such as button clicks, form submissions, and more.
// They can define event handlers in the component's class to execute specific actions or trigger changes in the application.

// Components have lifecycle hooks, which are methods that are called at specific stages of a component's lifecycle.
// Lifecycle hooks allow performing actions at various points, such as initialization, changes detection, and destruction.

// Components can communicate with other components using input and output properties.
// Input properties allow passing data into a component.
// Output properties emit events to notify parent components about specific actions or changes.

// Components can be organized in a hierarchical structure, where parent components contain child components.
// This allows creating complex UI layouts and establishing relationships between components for communication and data sharing.

// Component Structure:
// 		1. Template: Components have an associated template that defines the layout of the user interface.
//			Templates are written in HTML with additional Angular-specific syntax and directives.
// 		2. TypeScript Class: Contains the component's logic, properties, and methods.
//			The class is responsible for handling data, responding to events, and interacting with other components or services.
// 		3. Metadata: Components are decorated with metadata using the @Component decorator, which provides additional configuration information
//			such as the component's selector, template file, style files, and more.
// 		4. CSS styles (optional).

// Components encapsulate the rendering logic, data, and styles in a single unit, making it easier to manage and reuse UI elements across the app.

//### Component Class

// The component class is where you define the logic and data for the component. It is a TypeScript class decorated with the @Component decorator.

// The @Component decorator is used to define metadata for the component. Here are the primary properties used within this decorator:

// * selector: A custom HTML tag which identifies this component in the template. It is used to instantiate the component.
// * templateUrl: The path to the external HTML file for the component's template.
// * template: The inline HTML template for the component.
// * styleUrls: An array of paths to external CSS files for the component's styles.
// * styles: An array of inline CSS styles for the component.

import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  // Component logic and data go here
  title = 'Hello, Angular!';
}

// REMARK: Notice the import statement. It must appear in each file which declares a component.
// Components are very common, so they will be used a lot in these notes.
// To make the notes shorter, the "import { Component }" statement will be usually omitted.

//### Template

// Defines the HTML structure of the component.
// It can be inline (directly within the @Component decorator) or in a separate HTML file (referenced by the templateUrl property).

// Inline Template:
@Component({
  selector: 'app-example',
  template: `<h1>{{ title }}</h1>`,
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  title = 'Hello, Angular!';
}

// External Template:
<!-- example.component.html -->
<h1>{{ title }}</h1>

//### More about "selector"

// @@@ Type Selector (Component Directive)

// Matches elements based on their HTML tag name, or node name.
// Used to create custom reusable components. They have their own templates and logic encapsulated within the component.

@Component({
  selector: 'app-hello-world',
  template: `<h1>Hello World!</h1>`
})
export class HelloWorldComponent { }

// The selector specifies the custom HTML tag that is used to represent the component in the template.
// Essentially, it tells Angular where to instantiate the component in the DOM.
<!-- app.component.html -->
<app-hello-world></app-hello-world>
// When Angular parses the other template, it will replace the app-hello-world tag with the whole content of HelloWorldComponent template.
// In our example, in the rendered HTML, "<app-hello-world></app-hello-world>" will be replaced with "<h1>Hello World!</h1>".

// @@@ Attribute Selector (Attribute Directive)

// Matches elements based on the presence of an HTML attribute and, optionally, an exact value for that attribute.
// Modify the behavior or appearance of an existing element or component by applying custom logic.
// To use this directive in a template, you would apply it as an attribute, allowing you to apply the component to existing elements:
@Component({
  selector: '[app-example]', // notice the square brackets indicating an Attribute Selector
  template: `<p>Example component works!</p>`,
  ...
})

<!-- app.component.html -->
<div app-example></div>

// When Angular processes the template, it will inject the component's template content into the existing element.
// The final HTML output of the other template would look like this:
<div app-example>
  <p>Example component works!</p>
</div>

// @@@ Class Selector:

// This can be used to apply the component as a class, though it is less common:
@Component({
  selector: '.app-example', // notice the dot indicating a Class Selector
  template: `<p>Example component works!</p>`,
  ...
})
<!-- app.component.html -->
<div class="app-example"></div>

// The final HTML output of the other template would look like this:
<div class="app-example">
  <p>Example component works!</p>
</div>

// If multiple Angular components within the same module or template context use the same selector,
// Angular will encounter a conflict because it won't know which component to apply.
// To resolve this, each component must have a unique selector.

//### Styles

// Components can have associated styles, either inline styles or external CSS files, to define the visual presentation of the component's UI.

// Inline Styles:
@Component({
  selector: 'app-example',
  template: `<h1>{{ title }}</h1>`,
  styles: [`h1 { color: blue; }`]
})
export class ExampleComponent {
  title: string = 'Hello, Angular!';
  name: string = 'John';
  imageUrl: string = 'https://example.com/image.png';
  isButtonDisabled: boolean = false;
  
  getImage2Url(): string {
    return 'https://example.com/image2.png';
  }
  
  onClick() {
    console.log('Button clicked!');
  }
}

// External Styles:
/* example.component.css */
h1 {
  color: blue;
}

//### Standalone components

// In Angular, components are traditionally part of an NgModule.
// This means they must be declared in the declarations array of an Angular module,
// 		and the module is responsible for managing the component's lifecycle and dependencies.
// However, recent versions of Angular introduced the concept of "standalone components,"
// 		which allow components to be self-contained and used without being declared in an NgModule.

// Standalone components, introduced in Angular 14, can be used without being part of an NgModule.
// They are self-contained and declare their dependencies directly in the component itself
// 		providing more flexibility and simplicity in managing components. 

// A standalone component is a component that sets
standalone: true
// in its @Component metadata:
@Component({
  standalone: true,
  selector: 'profile-photo',
})
export class ProfilePhoto { }

// Standalone components are directly importable into other standalone components:
@Component({
  standalone: true,
  imports: [ProfilePhoto],
  template: `...the HTML fragment...`
})
export class UserProfile { }

// Another example of a Standalone Component:
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,  // Indicates this is a standalone component
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css'],
  imports: [CommonModule]  // Declare dependencies directly in the component
})
export class MyStandaloneComponent {}

// You can use a standalone component directly in other components or modules by importing it:
import { MyStandaloneComponent } from './standalone.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MyStandaloneComponent],  // Importing the standalone component
  bootstrap: [AppComponent]
})
export class AppModule {}

// If you see components that do not have standalone: true and are not explicitly mentioned in an NgModule, it's likely that:
// * They are declared in an NgModule, but you may not see it directly if you are looking at isolated files or snippets.
// * They might be declared in a shared or feature module, which is then imported into the root module or other modules.

// @@@ Key Differences and Advantages

// Here’s a look at what standalone components can do that non-standalone components cannot:

// 1. **No Need for NgModule**:
//   - Standalone Components can be used independently without being declared in an Angular module (`@NgModule`).
//		This simplifies the component setup, especially for smaller applications or individual components.
//   - Non-Standalone Components must be declared in an Angular module to be used.

// 2. **Simplified Imports**:
//	- Standalone Components import necessary Angular features (such as directives and pipes) directly within the component using the `imports` array.
//		This makes the component self-contained.
//   - Non-Standalone Components rely on the module to import and provide necessary features, which can lead to more complex dependency management.

// 3. **Faster Development and Prototyping**:
//  - Standalone Components allow for rapid development and prototyping by reducing the boilerplate code and simplifying the component setup.
//		This can be particularly useful in small projects or during the initial stages of development.

// 4. **Decoupled and Reusable**:
//   - Standalone Components are highly decoupled from the rest of the application, making them more reusable and easier to integrate
//		into different projects or parts of an application without additional setup.

// 5. **Improved Code Organization**:
//   - Standalone Components promote better code organization by allowing developers to keep the component logic and dependencies together.
//		This leads to more maintainable and understandable codebases.

// The shift to standalone components provides more flexibility and simplifies the development process.
// The Angular team recommends using standalone components for all new development.

// For more information, you can refer to the Angular documentation: https://angular.io/guide/standalone-components

//### The CLI command to create a new component

ng generate component my-component
ng g c my-component

// @@@ Working Directory:
// You should run this command from the root directory of your Angular project (where the `angular.json` file is located).
// However, Angular CLI is smart enough to find the right location even if you're in a subdirectory of your project.

// @@@ Created Files and Location:
// By default, this command will create a new folder named `my-component` inside the `src/app` directory of your project.
// Inside this folder, it will generate four files:

src/
└── app/
    └── my-component/
        ├── my-component.component.ts
        ├── my-component.component.html
        ├── my-component.component.css
        └── my-component.component.spec.ts

// my-component.component.ts
// 		The TypeScript file containing the component class.
// my-component.component.html
// 		The HTML template file for the component.
// my-component.component.css (or `.scss`, `.less`, `.sass` depending on your project setup):
// 		The stylesheet file for component-specific styles.
// my-component.component.spec.ts
// 		A basic unit test file for the component.

// @@@ Additional Actions:
// - The CLI will automatically add the new component to the declarations array of the nearest module (usually `app.module.ts`).
// - It will generate a selector for the component, typically in the format `app-my-component`.

// @@@ Customizing the Command:

// - You can specify a different location by providing a path:
ng generate component path/to/my-component

// - You can use the `--flat` flag to prevent creating a new folder:
ng generate component my-component --flat
// The files will be created in `src/app` rather than `src/app/my-component`:
src/
└── app/
    ├── my-component.component.ts
    ├── my-component.component.html
    ├── my-component.component.css
    └── my-component.component.spec.ts

// - Use `--skip-tests` to skip generating the spec file:
ng generate component my-component --skip-tests

// Remember, you can always run `ng generate component --help` to see all available options for this command.