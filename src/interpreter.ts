type Tag = "RESERVED" | "ID" | "INT";

interface LanguageToken {
    pattern: RegExp,
    tag: Tag 
}

interface Token {
	data: string,
	tag: Tag
}

var TOKEN_EXPRESSIONS: Array<LanguageToken> = [
    {
        pattern: /[\n\t]+/,
		tag: null
    },
	{
		pattern: /#[^\n]*/,
		tag: null
	},
	{
		pattern: /\:=/,
		tag: 'RESERVED',
	},
	{
		pattern: /\)/,
		tag: 'RESERVED',
	},
	{
		pattern: /;/,
		tag: 'RESERVED',
	},
	{
		pattern: /\+/,
		tag: 'RESERVED',
	},
	{
		pattern: /-/,
		tag: 'RESERVED',
	},
	{
		pattern: /\*/,
		tag: 'RESERVED',
	},
	{
		pattern: /\//,
		tag: 'RESERVED',
	},
	{
		pattern: /</,
		tag: 'RESERVED',
	},
	{
		pattern: />=/,
		tag: 'RESERVED',
	},
	{
		pattern: />/,
		tag: 'RESERVED',
	},
	{
		pattern: /=/,
		tag: 'RESERVED',
	},
	{
		pattern: /!=/,
		tag: 'RESERVED',
	},
	{
		pattern: /and/,
		tag: 'RESERVED',
	},
	{
		pattern: /or/,
		tag: 'RESERVED',
	},
	{
		pattern: /not/,
		tag: 'RESERVED',
	},
	{
		pattern: /if/,
		tag: 'RESERVED',
	},
	{
		pattern: /then/,
		tag: 'RESERVED',
	},
	{
		pattern: /else/,
		tag: 'RESERVED',
	},
	{
		pattern: /while/,
		tag: 'RESERVED',
	},
	{
		pattern: /do/,
		tag: 'RESERVED',
	},
	{
		pattern: /end/,
		tag: 'RESERVED',
	},
	{
		pattern: /[0-9]+/,
		tag: 'INT',
	},
	{
		pattern: /[A-Za-z][A-Za-z0-9_]*/,
		tag: 'ID',
	},
]

function lexer(source: String, languageTokens: Array<LanguageToken>) {
	let pieces = source.split(' ');
	let tokens: Array<Token> = [];
	pieces.forEach((piece) => {
		var token: Token;
		for (var i=0; i < languageTokens.length; i++) {
			if (languageTokens[i].pattern.exec(piece)) {
				token = {
					data: piece,
					tag: languageTokens[i].tag
				};
			}
		}

		if (!token) {
			throw new Error('Token not recognized');
		}

		tokens.push(token);
	});

	console.warn(tokens);
}

lexer("x := 1; \n x + 2", TOKEN_EXPRESSIONS);


