"use strict";
var MyInterpreter;
(function (MyInterpreter) {
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["ERR"] = -1] = "ERR";
        TokenType[TokenType["EOF"] = 0] = "EOF";
        TokenType[TokenType["NUMBER"] = 1] = "NUMBER";
        TokenType[TokenType["PLUS"] = 2] = "PLUS";
        TokenType[TokenType["MINUS"] = 3] = "MINUS";
        TokenType[TokenType["MUL"] = 4] = "MUL";
        TokenType[TokenType["DIV"] = 5] = "DIV";
        TokenType[TokenType["LParen"] = 6] = "LParen";
        TokenType[TokenType["RParen"] = 7] = "RParen";
    })(TokenType = MyInterpreter.TokenType || (MyInterpreter.TokenType = {}));
    var Token = /** @class */ (function () {
        function Token(type, value) {
            this.type = type;
            this.value = value;
        }
        return Token;
    }());
    MyInterpreter.Token = Token;
})(MyInterpreter || (MyInterpreter = {}));
/// <reference path='token.ts'/>
var MyInterpreter;
(function (MyInterpreter) {
    var Scanner = /** @class */ (function () {
        function Scanner(text) {
            var _this = this;
            this.getToken = function () {
                var token;
                if (_this.pos >= _this.text.length) {
                    return new MyInterpreter.Token(MyInterpreter.TokenType.EOF, NaN);
                }
                if (_this.text[_this.pos] === '+') {
                    _this.pos++;
                    return new MyInterpreter.Token(MyInterpreter.TokenType.PLUS, NaN);
                }
                if (_this.text[_this.pos] === '-') {
                    _this.pos++;
                    return new MyInterpreter.Token(MyInterpreter.TokenType.MINUS, NaN);
                }
                if (_this.text[_this.pos] === '*') {
                    _this.pos++;
                    return new MyInterpreter.Token(MyInterpreter.TokenType.MUL, NaN);
                }
                if (_this.text[_this.pos] === '/') {
                    _this.pos++;
                    return new MyInterpreter.Token(MyInterpreter.TokenType.DIV, NaN);
                }
                if (_this.text[_this.pos] === '(') {
                    _this.pos++;
                    return new MyInterpreter.Token(MyInterpreter.TokenType.LParen, NaN);
                }
                if (_this.text[_this.pos] === ')') {
                    _this.pos++;
                    return new MyInterpreter.Token(MyInterpreter.TokenType.RParen, NaN);
                }
                if ('0123456789.'.indexOf(_this.text[_this.pos]) > -1) {
                    return _this.getNumber();
                }
                _this.pos++;
                return new MyInterpreter.Token(MyInterpreter.TokenType.ERR, MyInterpreter.TokenType.ERR);
            };
            this.getNumber = function () {
                var str = '';
                do {
                    if (_this.text[_this.pos] === '.' && str.indexOf('.') > -1) {
                        throw "\u65E0\u6CD5\u89E3\u6790\u6570\u503C\uFF1A" + _this.text + " (" + _this.pos + ")";
                    }
                    str += _this.text[_this.pos];
                    _this.pos++;
                } while ('0123456789.'.indexOf(_this.text[_this.pos]) > -1);
                if (str.indexOf('.') > -1) {
                    return new MyInterpreter.Token(MyInterpreter.TokenType.NUMBER, parseFloat(str));
                }
                else {
                    return new MyInterpreter.Token(MyInterpreter.TokenType.NUMBER, parseInt(str));
                }
            };
            this.text = text;
            this.pos = 0;
        }
        return Scanner;
    }());
    MyInterpreter.Scanner = Scanner;
})(MyInterpreter || (MyInterpreter = {}));
/// <reference path='token.ts'/>
/// <reference path='scanner.ts'/>
var Program;
(function (Program) {
    var scanner = new MyInterpreter.Scanner('(1+2.56)*34');
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
    console.log(scanner.getToken());
})(Program || (Program = {}));
