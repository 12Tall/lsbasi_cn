namespace MyInterpreter {
    export enum TokenType {
        ERR = -1,
        EOF,
        NUMBER,
        PLUS,
        MINUS,
        MUL,
        DIV,
        LParen,
        RParen,  // parenthesis 插入语、括号

    }
    export class Token {
        type: TokenType;
        value: number;

        constructor(type: TokenType, value: number) {
            this.type = type;
            this.value = value;
        }

    }

}