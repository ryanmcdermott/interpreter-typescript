import Lexer from './lexer';

type Tag = "RESERVED" | "ID" | "INT" | "SKIP" | "EOF";

interface LanguageRegex {
  pattern: RegExp,
  tag: Tag
}

interface Token {
  data: string,
  tag: Tag
}

var TOKEN_EXPRESSIONS: Array <LanguageRegex> = [{
  pattern: /\:=/,
  tag: 'RESERVED',
}, {
  pattern: /\)/,
  tag: 'RESERVED',
}, {
  pattern: /;/,
  tag: 'RESERVED',
}, {
  pattern: /\+/,
  tag: 'RESERVED',
}, {
  pattern: /-/,
  tag: 'RESERVED',
}, {
  pattern: /\*/,
  tag: 'RESERVED',
}, {
  pattern: /\//,
  tag: 'RESERVED',
}, {
  pattern: /</,
  tag: 'RESERVED',
}, {
  pattern: />=/,
  tag: 'RESERVED',
}, {
  pattern: />/,
  tag: 'RESERVED',
}, {
  pattern: /=/,
  tag: 'RESERVED',
}, {
  pattern: /!=/,
  tag: 'RESERVED',
}, {
  pattern: /and/,
  tag: 'RESERVED',
}, {
  pattern: /or/,
  tag: 'RESERVED',
}, {
  pattern: /not/,
  tag: 'RESERVED',
}, {
  pattern: /if/,
  tag: 'RESERVED',
}, {
  pattern: /then/,
  tag: 'RESERVED',
}, {
  pattern: /else/,
  tag: 'RESERVED',
}, {
  pattern: /while/,
  tag: 'RESERVED',
}, {
  pattern: /do/,
  tag: 'RESERVED',
}, {
  pattern: /end/,
  tag: 'RESERVED',
}, {
  pattern: /[0-9]+/,
  tag: 'INT',
}, {
  pattern: /[A-Za-z][A-Za-z0-9_]*/,
  tag: 'ID',
}, {
  pattern: /\s+/,
  tag: 'SKIP'
}, {
  pattern: /[\n\t]+/,
  tag: 'SKIP'
}, {
  pattern: /#[^\n]*/,
  tag: 'SKIP'
}, {
  pattern: /$/,
  tag: 'EOF'
}];


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

var interpreter = new Interpreter("x:=1;", TOKEN_EXPRESSIONS);
interpreter.parse();
console.warn(interpreter.tokens);
