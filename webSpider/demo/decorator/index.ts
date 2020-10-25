/**
 * 类的装饰器：
 * 装饰器本身是一个函数，且通过 @ 符号来使用
 * 装饰器接受一个 constructor 函数
 */

function testDecorator(constructor: any) {
  console.log("decoratorqwe");
}
@testDecorator class Decorator { }
// const decorator = new Decorator();



function isUseDecorator(flag: boolean) {
  if (flag) {
    return function (constructor: any) {
      constructor.prototype.getName = () => {
        console.log("lx");
      }
    }
  } else {
    return function (constructor: any) { }
  }
}

@isUseDecorator(true) class Test { };
const test = new Test();
(test as any).getName();


function isTDecorator<T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor {
    name = "long";
    getName() {
      return this.name;
    }
  }
}

@isTDecorator class testT {
  name: string;
  constructor(name_: string) {
    this.name = name_;
  }
}

const test_t = new testT("lx");
console.log((test_t as any).getName());