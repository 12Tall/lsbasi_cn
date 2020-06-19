/**
 * @package Lexer
 * @author 12tall
 * @description 提供一个生成函数，根据输入字符串，每调用一次，生成一个token
 */
const { Token } = require('./Token');

/**
 * @function Gen_char 从字符串中提取非空字符
 * @param {string} text 
 */
function* Gen_char(text) {
    var pos = 0;
    while (true) {
        if ("\t\r\n ".indexOf(text[pos]) < 0) {
            yield text[pos]
        }
        pos++;
        if (pos === text.length) {
            return null
        }
    }
}

/**
 * @function Gexer Lexer 的生成器写法
 * @param {string} text 
 */
function* Gexer(text) {
    var gen_char = Gen_char(text),
        res = gen_char.next(),
        token;

    while (!res.done) {
        var val = res.value
        if (is_num(val)) {
            yield get_int();
            continue;
        }
        if (is_op(val)) {
            yield get_op();
            continue;
        }
    }

    yield new Token(Token.EOF, Token.EOF)


    // ------------------内部方法------------------ //

    function get_int() {
        res = gen_char.next();
        while (!res.done && is_num(res.value)) {
            val += res.value;
            res = gen_char.next();
        }
        return new Token(Token.INTEGER, val);
    }

    function get_op() {
        res = gen_char.next();
        var token;
        switch (val) {
            case "+":
                token = new Token(Token.PLUS, "+");
                break;
            case "-":
                token = new Token(Token.MINUS, "-");
                break;
            case "*":
                token = new Token(Token.MUL, "*");
                break;
            case "/":
                token = new Token(Token.DIV, "/");
                break;
        }
        return token;
    }

}

function Lexer(text) {
    let self = this;
    this.text = text;
    this.pos = 0;

    /**
     * @name get_ch
     * @summary 获取有效字符，跳过空格等无效字符
     */
    function get_ch() {
        if (self.pos >= self.text.length) {
            return null;
        }

        let ch;
        do {
            ch = self.text[self.pos];
            self.pos++;
        } while (' ' === ch);

        return ch;
    }

    /**
     * @name get_num
     * @summary 获取有效的数字
     */
    function get_num(init) {
        let num = init,
            ch = get_ch();
        while (is_num(ch)) {
            num += ch;
            ch = get_ch();
        }
        self.pos--;  // 不用局部变量，就需要将指针重置到最后一位数字
        return num;
    }

    this.get_next_token = function () {
        var ch = get_ch();

        switch (ch) {
            case null:
                return new Token(Token.EOF, Token.EOF);
            case '+':
                return new Token(Token.PLUS, ch);
            case '-':
                return new Token(Token.MINUS, ch);
            default:
                break;
        }
        if (is_num(ch)) {
            let num = get_num(ch);
            return new Token(Token.INTEGER, num);
        }

        throw "Invalid Character";
    }

    this.get_token = function (type) {
        let token = self.get_next_token();
        if (token.type === type) {
            return token;
        }
        throw "Invalid Token"
    }

    return this;
}


module.exports = {
    Lexer,
    Gexer,
    Token
}


/**-----------------------私有-----------------------**/
function is_num(ch) {
    return (ch !== null && ch >= '0' && ch <= '9');
}

function is_op(ch) {
    // 目前仅支持四则运算
    return ("+-*/").indexOf(ch) >= 0;
}
