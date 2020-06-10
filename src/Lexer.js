const { Token } = require('./Token');

function Lexer(text) {
    let self = this;
    this.text = text;
    this.pos = 0;

    function get_next_token() {
        if (self.pos >= self.text.length) {
            return new Token(Token.EOF, Token.EOF);
        }
        var ch = self.text[self.pos]
        if (ch === '+') {
            self.pos++;
            return new Token(Token.PLUS, ch);
        }
        if (ch >= '0' && ch <= '9') {
            self.pos++;
            return new Token(Token.INTEGER, ch);
        }

        throw "Invalid Character";
    }

    this.get_token = function (type) {
        let token = get_next_token();
        if(token.type === type){
            return token;
        }
        throw "Invalid Token"
    }

    return this;
}


module.exports = {
    Lexer,
    Token
}