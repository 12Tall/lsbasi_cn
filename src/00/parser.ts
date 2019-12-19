/// <reference path='tokenlizer.ts'/>
namespace MyInterpreter {
    export class Parser {
        tokenlizer: Tokenlizer;
        current_token: Token | null;

        constructor(tokenlizer: Tokenlizer) {
            this.tokenlizer = tokenlizer;
            this.current_token = this.tokenlizer.get_next_token();
        }

        eat = (tokenType: string): Token | null => {
            let token = this.current_token;
            if (this.current_token?.type === tokenType) {
                this.current_token = this.tokenlizer.get_next_token();
            } else {
                throw '不正确的词素';
            }
            return token;
        }

    }
}
