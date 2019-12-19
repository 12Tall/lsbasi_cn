/// <reference path='token.ts'/>
/// <reference path='scanner.ts'/>
namespace Program {
    let scanner = new MyInterpreter.Scanner('(1+2.56)*34');
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
}