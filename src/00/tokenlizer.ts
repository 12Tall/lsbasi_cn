/// <reference path='token.ts' />
namespace MyInterpreter {

    export class Tokenlizer {
        text: string;
        pos: number;

        constructor(text: string) {
            this.pos = 0;
            this.text = text;
        }

        err = (): void => {
            throw `分词出错：[${this.pos}] ${this.text}`;
        }

        get_next_token = (): Token | null => {
            let text = this.text;
            if (this.pos >= text.length) {
                return new Token(TokenType.EOF, null);
            }
            
            let current_char: string = text.charAt(this.pos);
            this.pos++;

            if (current_char === '+') {
                return new Token(TokenType.PLUS, '+');
            }
            let value = parseInt(current_char);
            if (!isNaN(value)) {
                return new Token(TokenType.INTEGER, value);
            }

            this.err();
            return null;
        }


    }

}