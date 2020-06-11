const { Token, Lexer } = require('./Lexer')
function Parser(text) {
    self = this;
    this.lexer = new Lexer(text);


    this.expr = function () {
        let left = self.lexer.get_token(Token.INTEGER),
            op = self.lexer.get_next_token(),
            right = self.lexer.get_token(Token.INTEGER);

        switch (op.type) {
            case Token.PLUS:
                return parseInt(left.value) + parseInt(right.value);
            case Token.MINUS:
                return parseInt(left.value) - parseInt(right.value);
            default: break;
        }

        throw 'operator error'
    }


}

module.exports = {
    Parser,
    Lexer,
    Token
}