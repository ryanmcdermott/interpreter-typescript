type Tag = "RESERVED" | "ID" | "INT" | "SKIP" | "EOF";

interface LanguageRegex {
  pattern: RegExp,
  tag: Tag
}

interface Token {
  data: string,
  tag: Tag
}
