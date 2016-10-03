/// <reference path="./types.d.ts"/>

var LANGUAGE_EXPRESSIONS: Array <LanguageRegex> = [
{
  pattern: /\(/,
  tag: 'PUNCTUATION',
}, {
  pattern: /\)/,
  tag: 'PUNCTUATION',
}, {
  pattern: /;/,
  tag: 'PUNCTUATION',
}, {
  pattern: /\+/,
  tag: 'OPERATOR',
}, {
  pattern: /-/,
  tag: 'OPERATOR',
}, {
  pattern: /\*/,
  tag: 'OPERATOR',
}, {
  pattern: /\//,
  tag: 'OPERATOR',
}, {
  pattern: /</,
  tag: 'OPERATOR',
}, {
  pattern: />=/,
  tag: 'OPERATOR',
}, {
  pattern: />/,
  tag: 'OPERATOR',
}, {
  pattern: /=/,
  tag: 'OPERATOR',
}, , {
  pattern: /\&\&/,
  tag: 'OPERATOR',
}, {
  pattern: /\|\|/,
  tag: 'OPERATOR',
}, {
  pattern: /if/,
  tag: 'KEYWORD',
}, {
  pattern: /then/,
  tag: 'KEYWORD',
}, {
  pattern: /else/,
  tag: 'KEYWORD',
}, {
  pattern: /function/,
  tag: 'KEYWORD',
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
