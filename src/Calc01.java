/**
 * lsbasi 的Java 实现(01)
 *
 * @author 12tall
 * @date 2019-07-19
 */

import java.util.Scanner;

/**
 * 程序入口
 */
public class Calc01 {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String expr;
        while (true) {
            try {
                System.out.println("calc> ");
                expr = scanner.next();
            } catch (Exception e) {
                break;
            }
            if (expr.isEmpty()) {
                continue;
            }
            Interpreter interpreter = new Interpreter(expr);
            int result = interpreter.expr();
            System.out.println(result);
        }
    }
}

/**
 * Token 类
 */
class Token {
    public String type;
    public String value;

    /**
     * Token 的构造函数
     *
     * @param type  token 类型
     * @param value token 值(因为Java属于强类型，所以统一取字符串类型)
     */
    Token(String type, String value) {
        this.type = type;
        this.value = value;
    }

    @Override
    public String toString() {
        return "Token{" +
                "type='" + type + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}

/**
 * Interpreter 类
 */
class Interpreter {

    // token 的类型
    public static final String PLUS = "PLUS", MINUS = "MINUS", MUL = "MUL", DIV = "DIV", INTEGER = "INTEGER", LParen = "LParen", RParen = "RParen", EOF = null;

    private String text;
    private int pos;
    private Token current_token;

    /**
     * 构造函数
     *
     * @param text 输入的表达式
     */
    Interpreter(String text) {
        this.text = text;
        this.pos = 0;
        this.current_token = null;
    }

    void error() throws Exception {
        throw new Exception("无法解析输入字符串");
    }

    /**
     * 从输入字符串获取下一个token
     */
    Token get_next_token() throws Exception {
        String text = this.text;

        // 已经到达字符串结束
        if (this.pos > text.length() - 1) {
            return new Token(EOF, null);
        }
        char current_char = text.charAt(this.pos);

        // 当前字符为数字 则返回Token(INTEGER,num)
        if (Character.isDigit(current_char)) {
            Token token = new Token(INTEGER, String.valueOf(current_char));
            this.pos++;
            return token;
        }
        // 当前字符为+ 则返回Token(PLUS,+)
        if (current_char == '+') {
            Token token = new Token(PLUS, String.valueOf(current_char));
            this.pos++;
            return token;
        }
        error();
        // 必须有一个返回值
        // 其实根本不会执行到这儿
        return new Token(EOF, null);
    }

    /**
     * 校验token
     *
     * @param token_type 目标token 类型
     */
    void eat(String token_type) throws Exception {
        if (current_token.type == token_type) {
            // 如果正确，则将当前token 指向从字符串中新获取的token
            current_token = get_next_token();
        } else {
            error();
        }
    }

    /**
     * 解释器真正开始的地方
     */
    int expr() throws Exception {
        this.current_token = get_next_token();

        Token left = current_token;
        eat(INTEGER);

        Token op = current_token;
        eat(PLUS);

        Token right = current_token;
        eat(INTEGER);

        int result = Integer.parseInt(left.value) + Integer.parseInt(right.value);
        return result;
    }
}