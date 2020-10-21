///<reference path="./components.ts" />

namespace Home {
  export namespace Worker {
    export const teacher: Components.User = {
      name: "lx"
    }
  }
  export class Page {
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}