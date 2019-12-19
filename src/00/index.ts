/// <reference path='token.ts'/>
/// <reference path='tokenlizer.ts'/>
/// <reference path='parser.ts'/>
namespace Program {
    let str = '1+1';
    let parser = new MyInterpreter.Parser(new MyInterpreter.Tokenlizer(str));

    let left = parser.eat(MyInterpreter.TokenType.INTEGER);
    let op = parser.eat(MyInterpreter.TokenType.INTEGER);
    let right = parser.eat(MyInterpreter.TokenType.INTEGER);

    console.log(<number>left?.value + <number>right?.value);
}