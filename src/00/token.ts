namespace MyInterpreter {
    export const TokenType = { INTEGER: 'INTEGER', PLUS: 'PLUS', EOF: 'EOF' };
    export class Token {
        type: string;
        value: number | string | null;

        public constructor(type: string, value: number | string | null) {
            this.type = type;
            this.value = value;
        }

        public ToString() {
            return `Token(${this.type},${this.value})`;
        }
    }
}