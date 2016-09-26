/// <reference path="./types.d.ts"/>

var LANGUAGE_EXPRESSIONS: Array <LanguageRegex> = [{
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

export default LANGUAGE_EXPRESSIONS;