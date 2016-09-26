/// <reference path="./types.d.ts"/>

import Lexer from './lexer';
import LANGUAGE_EXPRESSIONS from './language-expressions';

class Interpreter {
  code: string;
  languageRegexes: Array<LanguageRegex>;
  tokens: Array<Token>;

  constructor(code: string, languageRegexes: Array<LanguageRegex>) {
    this.code = code;
    this.languageRegexes = languageRegexes;
    this.tokens = [];
  }

  parse() {
    this.lex();

    // TODO: Actually parse
  }

  lex() {
    var lexer = new Lexer();

    this.languageRegexes.forEach((regex) => {
      lexer(regex.pattern)((match: string, rest, state) => {
        switch (regex.tag) {
          case 'ID':
          case 'INT':
          case 'RESERVED':
            this.tokens.push({
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
  }
}

var interpreter = new Interpreter("x:=1;", LANGUAGE_EXPRESSIONS);
interpreter.parse();
console.warn(interpreter.tokens);
