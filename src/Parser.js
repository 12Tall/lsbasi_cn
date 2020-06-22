const { Token, Lexer, Gexer } = require('./Lexer')

function Garser(text) {
    var gexer = Gexer(text);
    var curren_token;
    var result;

    return phase()



    // --------------局部方法--------------- //

    /**
    * @function phase 获取最低优先级运算
    * @description
    * 已知问题：仅能计算出表达式正确部分的值 
    * --> term --> [*|/ --> term] -->
    *             \--------<------/
    */
    function phase() {
        var result = term();
        while ([Token.PLUS, Token.MINUS].indexOf(curren_token.type) >= 0) {
            switch (curren_token.type) {
                case Token.PLUS:
                    result += term();
                    break;
                case Token.MINUS:
                    result -= term();
                    break;
                default:
                    throw "语法错误";
            }
        }        
        return result
    }
    /**
     * @function term 获取次级运算
     * @description
     * --> factor --> [*|/ --> factor] -->
     *             \--------<-------/
     */
    function term() {
        var result = factor();
        while ([Token.MUL, Token.DIV].indexOf(curren_token.type) >= 0) {
            switch (curren_token.type) {
                case Token.MUL:
                    result *= factor();
                    break;
                case Token.DIV:
                    result /= factor();
                    break;
                default:
                    throw "语法错误";
            }
        }

        return result;
    }

    /**
     * @function factor 获取运算优先级最高的单位
     * @description 目前为止是一个整数Token
     * --> INTEGER -->
     */
    function factor() {
        var temp = curren_token = get_token();
        if (curren_token.type === Token.INTEGER) {
            curren_token = get_token();
            return temp.value;
        }
        if (curren_token.type === Token.L_P) {
            var result = phase()
            if(curren_token.type === Token.R_P){
                curren_token = get_token();
                return result;
            }
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

