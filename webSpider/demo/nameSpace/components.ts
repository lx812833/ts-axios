namespace Components {
  export interface User {
    name: string
  }
  export class Header {
    constructor() {
      const ele = document.createElement("div");
      ele.innerHTML = "this is header";
      document.body.appendChild(ele)
    }
  }

  export class Content {
    constructor() {
      const ele = document.createElement("div");
      ele.innerHTML = "this is header";
      document.body.appendChild(ele)
    }
  }

  export class Footer {
    constructor() {
      const ele = document.createElement("div");
      ele.innerHTML = "this is header";
      document.body.appendChild(ele)
    }
  }
}