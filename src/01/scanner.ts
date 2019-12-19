/// <reference path='token.ts'/>
namespace MyInterpreter {
    export class Scanner {
        text: string;
        pos: number;
        constructor(text: string) {
            this.text = text;
            this.pos = 0;
        }

        getToken = (): Token => {
            let token: Token;

            if (this.pos >= this.text.length) {
                return new Token(TokenType.EOF, NaN);
            }

            if (this.text[this.pos] === '+') {
                this.pos++;
                return new Token(TokenType.PLUS, NaN);
            }

            if (this.text[this.pos] === '-') {
                this.pos++;
                return new Token(TokenType.MINUS, NaN);
            }

            if (this.text[this.pos] === '*') {
                this.pos++;
                return new Token(TokenType.MUL, NaN);
            }

            if (this.text[this.pos] === '/') {
                this.pos++;
                return new Token(TokenType.DIV, NaN);
            }

            if (this.text[this.pos] === '(') {
                this.pos++;
                return new Token(TokenType.LParen, NaN);
            }

            if (this.text[this.pos] === ')') {
                this.pos++;
                return new Token(TokenType.RParen, NaN);
            }

            if ('0123456789.'.indexOf(this.text[this.pos]) > -1) {
                return this.getNumber();
            }

            this.pos++;
            return new Token(TokenType.ERR, TokenType.ERR);
        }

        private getNumber = (): Token => {
            let str = '';
            do {
                if (this.text[this.pos] === '.' && str.indexOf('.') > -1) {
                    throw `无法解析数值：${this.text} (${this.pos})`;
                }
                str += this.text[this.pos];
                this.pos++;
            } while ('0123456789.'.indexOf(this.text[this.pos]) > -1);

            if (str.indexOf('.') > -1) {
                return new Token(TokenType.NUMBER, parseFloat(str));
            } else {
                return new Token(TokenType.NUMBER, parseInt(str));
            }
        }
    }
}