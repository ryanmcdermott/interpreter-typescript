/// <reference path="./types.d.ts"/>

/**
 * Parser
 * Build AST (Abstract Syntax Tree) to feed to evaluator(interpreter).
 *
 * @param {Array<Token>} tokens Array of tokens extracted from code by the Lexer.
 * @returns {Object<AST>} ast Abstract Syntax Tree object.
 **/
export default class Parser {
  tokens: Array<Token>;
  position: number;
  PRECEDENCE: Object;

  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
    this.PRECEDENCE = Object.freeze({
        "=": 1,
        "||": 2,
        "&&": 3,
        "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
        "+": 10, "-": 10,
        "*": 20, "/": 20, "%": 20,
    });
  }

  error(msg: String) {
    throw new Error(msg + ' at position ' + this.position +
                    ' on token: ' + this.tokens[this.position].data);
  }

  parse() {
    var program = [];

    while (!this.isEnd()) {
      program.push(this.parseExpression());
    }

    var ast = {
      program: program,
      type: 'program'
    };

    return ast;
  }

  nextToken() {
    this.position += 1;
  }

  currentToken() {
    return this.tokens[this.position];
  }

  isEnd() {
    return this.position === this.tokens.length;
  }

  parseExpression() {
    return this.determineCall(() => {
      return this.parseBinary(this.parseToken, 0);
    });
  }

  parseToken() {

  }

  determineCall() {

  }

  parseIdentifier() {
    if (this.currentToken().tag === 'ID') {
      return this.currentToken().data;
    } else {
      this.error('Expected identifier');
    }
  }

  parsePunctuation(token: Token) {
    if (token.tag === 'PUNCTUATION') {
      this.nextToken();
    } else {
      this.error('Expected punctuation');
    }
  }
}
