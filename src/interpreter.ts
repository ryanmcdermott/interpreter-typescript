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
	{
		pattern: /\s+/,
		tag: 'SKIP'
	},	
    {
        pattern: /[\n\t]+/,
		tag: 'SKIP'
    },
	{
		pattern: /#[^\n]*/,
		tag: 'SKIP'
	},
	{
		pattern: /$/,
		tag: 'EOF'
	},
]

function McState() {

 var that = this ;

 var rules = [] ;
 
 var state = function (regex) {
  return function (action) {
   rules.push(new McRule(regex,action)) ;
  } ;
 } ;

 state.rules = rules ;

 state.lex = function (input) {
   var nextCont = state.run(input) ;
   while (typeof nextCont == "function") {
     nextCont = nextCont() ;
   }
   return nextCont ;
 }

 state.run = McRunMethod ;

 state.continuation = function (input) {
   return function () {
     return state.run(input) ;
   } ;
 }

 return state ;
}


function McRule(regex,action) {
  // Each rule is re-written to match prefixes of the input string.
  this.regex = new RegExp("^(" + regex.source + ")") ;
  if (this.regex.compile) this.regex.compile(this.regex) ;
  this.action = action ;
}

McRule.prototype.matches = function (s) {
 var m = s.match(this.regex) ;
 if (m) m.shift() ;
 return m ;
} ;


function McRunMethod(input) {
  var longestMatchedRule = null ;
  var longestMatch = null ;
  var longestMatchedLength = -1 ;
  
  for (var i = this.rules.length-1; i >= 0; --i) {
    var r = this.rules[i] ;

    var m = r.matches(input) ;
    
    if (m && (m[0].length >= longestMatchedLength)) {
      longestMatchedRule = r ;
      longestMatch = m ;
      longestMatchedLength = m[0].length ;
    }
  }
  
  if (longestMatchedRule) {
    return longestMatchedRule.action(longestMatch,input.substring(longestMatchedLength),this) ;
  } else {
    throw ("Lexing error; no match found for: '" + input + "'") ;
  }
}

/* Creates a continuation that switches analysis to another lexical state.  */
function McCONTINUE(state) {
  return function (rest) {
    return state.run(rest) ;
  }
}


var McLexer = {
 State : McState 
} ;



function lexer(code : string, languageRegexes) {
	var INIT = new McLexer.State() ;

	var tokens = [] ;

	languageRegexes.forEach((regex) => {
		INIT(regex.pattern)(function (match, rest, state) {
			console.warn(match);
			console.warn(state);
			switch(regex.tag) {
				case 'ID':
				case 'INT':
				case 'RESERVED':
					tokens.push({
						data: match[0],
						tag: regex.tag
					});

					return state.continuation(rest) ;
					break;

				case 'SKIP':
					McCONTINUE(INIT);
					break;

				case 'EOF':
					return null;
					break;
			}
		});
	});

	INIT.lex(code);

	return tokens
}


var tokens = lexer("x:=1;", TOKEN_EXPRESSIONS);

console.warn(tokens);


