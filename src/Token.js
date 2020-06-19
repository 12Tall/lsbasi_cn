function Token(type, value) {
    let self = this;
    // 在创建Token 时自动转化数据类型
    Object.defineProperty(self, "value", {
        get: () => {
            return value;
        },
        set: (val) => {
            switch (self.type) {
                case Token.INTEGER:
                    value = parseInt(val);
                    break;
                default:
                    value = val;
                    break;
            }
        }
    })


    this.type = type;
    this.value = value;

    this.toStr = function () {
        return `Token(${self.type},${self.value.toStr ? self.value.toStr() : self.value})`;
    }
    this.toString = function () {
        return self.toStr();
    }


}

Token.INTEGER = "INTEGER";
Token.PLUS = "PLUS";
Token.MINUS = "MINUS";
Token.EOF = "EOF";

module.exports = {
    Token
}


