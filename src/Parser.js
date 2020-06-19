const { Token, Lexer, Gexer } = require('./Lexer')

function Garser(text) {
    var gexer = Gexer(text);
    var curren_token;

    var result = term().value;

    while (curren_token.type !== Token.EOF) {
        switch (curren_token.type) {
            case Token.PLUS:
                result += term().value;
                break;
            case Token.MINUS:
                result -= term().value;
                break;
            default:
                throw "语法错误";
        }

    }
    
    return result;



    // --------------局部方法--------------- //
    function term() {
        // 目前为止，term() 只是返回一个整数Token 即可
        var temp = curren_token = get_token();
        if (curren_token.type === Token.INTEGER) {
            curren_token = get_token();
            return temp;
        }
        throw "无效的term";
    }

    function get_token() {
        var res = gexer.next();
        if (!res.done) {
            return res.value;
        }
        throw "获取token 失败"
    }

}



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
    Garser,
    Parser,
    Lexer,
    Gexer,
    Token
}


