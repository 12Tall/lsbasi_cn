const { Token } = require('./Token');

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
    Token
}


/**-----------------------私有-----------------------**/
function is_num(ch) {
    return (ch !== null && ch >= '0' && ch <= '9');
}