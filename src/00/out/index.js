"use strict";
var MyInterpreter;
(function (MyInterpreter) {
    MyInterpreter.TokenType = { INTEGER: 'INTEGER', PLUS: 'PLUS', EOF: 'EOF' };
    var Token = /** @class */ (function () {
        function Token(type, value) {
            this.type = type;
            this.value = value;
        }
        Token.prototype.ToString = function () {
            return "Token(" + this.type + "," + this.value + ")";
        };
        return Token;
    }());
    MyInterpreter.Token = Token;
})(MyInterpreter || (MyInterpreter = {}));
/// <reference path='token.ts' />
var MyInterpreter;
(function (MyInterpreter) {
    var Tokenlizer = /** @class */ (function () {
        function Tokenlizer(text) {
            var _this = this;
            this.err = function () {
                throw "\u5206\u8BCD\u51FA\u9519\uFF1A[" + _this.pos + "] " + _this.text;
            };
            this.get_next_token = function () {
                var text = _this.text;
                if (_this.pos >= text.length) {
                    return new MyInterpreter.Token(MyInterpreter.TokenType.EOF, null);
                }
                var current_char = text.charAt(_this.pos);
                _this.pos++;
                if (current_char === '+') {
                    return new MyInterpreter.Token(MyInterpreter.TokenType.PLUS, '+');
                }
                var value = parseInt(current_char);
                if (!isNaN(value)) {
                    return new MyInterpreter.Token(MyInterpreter.TokenType.INTEGER, value);
                }
                _this.err();
                return null;
            };
            this.pos = 0;
            this.text = text;
        }
        return Tokenlizer;
    }());
    MyInterpreter.Tokenlizer = Tokenlizer;
})(MyInterpreter || (MyInterpreter = {}));
/// <reference path='tokenlizer.ts'/>
var MyInterpreter;
(function (MyInterpreter) {
    var Parser = /** @class */ (function () {
        function Parser(tokenlizer) {
            var _this = this;
            this.eat = function (tokenType) {
                var _a;
                var token = _this.current_token;
                if (((_a = _this.current_token) === null || _a === void 0 ? void 0 : _a.type) === tokenType) {
                    _this.current_token = _this.tokenlizer.get_next_token();
                }
                else {
                    throw '不正确的词素';
                }
                return token;
            };
            this.tokenlizer = tokenlizer;
            this.current_token = this.tokenlizer.get_next_token();
        }
        return Parser;
    }());
    MyInterpreter.Parser = Parser;
})(MyInterpreter || (MyInterpreter = {}));
/// <reference path='token.ts'/>
/// <reference path='tokenlizer.ts'/>
/// <reference path='parser.ts'/>
var Program;
(function (Program) {
    var _a, _b;
    var str = '1+1';
    var parser = new MyInterpreter.Parser(new MyInterpreter.Tokenlizer(str));
    var left = parser.eat(MyInterpreter.TokenType.INTEGER);
    var op = parser.eat(MyInterpreter.TokenType.INTEGER);
    var right = parser.eat(MyInterpreter.TokenType.INTEGER);
    console.log(((_a = left) === null || _a === void 0 ? void 0 : _a.value) + ((_b = right) === null || _b === void 0 ? void 0 : _b.value));
})(Program || (Program = {}));
