function Token(type, value) {
    let self = this;
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
Token.EOF = "EOF";
module.exports = {
    Token
}