const { Token, Lexer } = require('./Lexer')
function Parser(text) {
    self = this;
    this.lexer = new Lexer(text);

    this.expr = function () {
        let left = self.lexer.get_token(Token.INTEGER),
            op = self.lexer.get_token(Token.PLUS),
            right = self.lexer.get_token(Token.INTEGER);

        return parseInt(left.value) + parseInt(right.value);
    }


}

module.exports = {
    Parser,
    Lexer,
    Token
}