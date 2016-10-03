/// <reference path="./types.d.ts"/>

import Lexer from './lexer';
import Parser from './parser';
import LANGUAGE_EXPRESSIONS from './language-expressions';

export default class Interpreter {
  code: string;
  languageRegexes: Array<LanguageRegex>;
  tokens: Array<Token>;
  ast: Object;

  constructor(code: string, languageRegexes: Array<LanguageRegex>) {
    this.code = code;
    this.languageRegexes = languageRegexes;
    this.tokens = [];
  }

  evaluate() {
    this.tokens = this.lex(this.code);
    var parser = new Parser(this.tokens);
    this.ast = parser.parse();
  }

  lex(code: string) {
    var lexer = new Lexer();
    var tokens: Array<Token>;
    tokens = [];

    this.languageRegexes.forEach((regex) => {
      lexer(regex.pattern)((match: string, rest, state) => {
        switch (regex.tag) {
          case 'KEYWORD':
          case 'OPERATOR':
          case 'PUNCTUATION':
          case 'ID':
          case 'INT':
            tokens.push({
              data: match[0],
              tag: regex.tag
            });
            return state.continuation(rest);

          case 'SKIP':
            return function(rest) {
              return lexer.run(rest);
            }

          case 'EOF':
            return null;
        }
      });
    });

    lexer.lex(this.code);
    return tokens;
  }
}

class Scope {
  constructor(parentScope) {
    this.parentScope = parentScope;
  }
}

var interpreter = new Interpreter("x=1+2;", LANGUAGE_EXPRESSIONS);
interpreter.evaluate();
console.warn(interpreter.tokens);
