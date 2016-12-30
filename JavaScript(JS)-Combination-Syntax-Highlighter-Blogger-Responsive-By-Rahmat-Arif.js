/* JavaScript(JS) Combination Syntax Highlighter By Rahmat Arif | URL http://rahmatarifish.blogspot.com */

<style type='text/css'>
/* CSS Syntax Highlighter By Rahmat Arif | URL http://rahmatarifish.blogspot.com */
pre {padding:35px 10px 10px 10px;margin:.5em 0;white-space:pre;word-wrap:break-word;overflow:auto;background-color:#222;position:relative;max-height:500px;border-radius:3px;}
pre::before {font-size:13px;content:attr(title);position:absolute;top:0;background-color:transparent;padding:6px 10px 7px 10px;left:0;right:0;color:#fff;display:block;margin:0 0 15px 0;font-weight:400;box-shadow:0 1px 3px rgba(0,0,0,0.1);}
pre::after {content:"Double click to selection";padding:2px 10px;width:auto;height:auto;position:absolute;right:8px;top:4px;font-size:12px;color:#fff;line-height:20px;transition:all 0.3s ease-in-out;}
pre:hover::after {opacity:0;top:-8px;visibility:visible;}
code {font-family:'Open Sans'sans-serif;line-height:16px;color:#88a9ad;background-color:transparent;
padding:1px 2px;font-size:13px;}
pre code {display:block;background:none;border:none;color:#c2bfd2;direction:ltr;
text-align:left;word-spacing:normal;padding:10px;font-weight:bold;}
code .token.punctuation {color:#ba3a3e;}
pre code .token.punctuation {color:#777;}
code .token.comment,code .token.prolog,code .token.doctype,code .token.cdata {color:#666;}
code .namespace {opacity:.8;}
code .token.property,code .token.tag,code .token.boolean,code .token.number {color:#d75046;}
code .token.selector,code .token.attr-name,code .token.string {color:#88a9ad;}
pre code .token.selector,pre code .token.attr-name {color:#00a1d6;}
pre code .token.string {color:#6fb401;}
code .token.entity,code .token.url,pre .language-css .token.string,pre .style .token.string {color:#5ac954;}
code .token.operator {color:#1887dd;}
code .token.atrule,code .token.attr-value {color:#009999;}
pre code .token.atrule,pre code .token.attr-value {color:#1baeb0;}
code .token.keyword {color:#e13200;font-style:italic;}
code .token.comment {font-style:italic;}
code .token.regex {color:#ccc;}
code .token.important {font-weight:bold;}
code .token.entity {cursor:help;}
pre mark {background-color:#ea4f4e!important;color:#fff!important;padding:2px;border-radius:2px;}
code mark {background-color:#ea4f4e!important;color:#fff!important;padding:2px;border-radius:2px;}
pre code mark {background-color:#ea4f4e!important;color:#fff!important;padding:2px;border-radius:2px;}
.comments pre {padding:10px 10px 15px 10px;background:#222;}
.comments pre::before {content:'Code';font-size:12px;position:relative;top:0;
background-color:#5a9ad2;padding:1px 6px;left:0;right:0;color:#fff;text-transform:uppercase;
display:inline-block;margin:0 0 10px 0;font-weight:400;border-radius:3px;border:none;}
.comments pre::after {font-size:11px;}
.comments pre code {color:#c2bfd2;}
.comments pre.line-numbers {padding-left:10px;}
pre.line-numbers {position:relative;padding-left:3.0em;counter-reset:linenumber;}
pre.line-numbers > code {position:relative;}
.line-numbers .line-numbers-rows {height:100%;position:absolute;top:0;font-size:100%;left:-3.5em;width:3.5em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;padding:10px 0 0 0;background:#2a2a2a;border-right:1px solid #3a3a3a;}
.line-numbers-rows > span {display:block;counter-increment:linenumber;}
.line-numbers-rows > span:before {content:counter(linenumber);color:#666;display:block;
padding-right:0.8em;text-align:right;transition:350ms;}
pre[data-codetype="CSS"]:before{background-color:#003300;}
pre[data-codetype="HTML"]:before{background-color:#006600;}
pre[data-codetype="JavaScript"]:before{background-color:#009900;}
pre[data-codetype="JQuery"]:before{background-color:#00ff00;}
</style>
<script type='text/javascript'>
//Pre Auto Selection
$('i[rel="pre"]').replaceWith(function() {
    return $('<pre><code>' + $(this).html() + '</code></pre>');
});
var pres = document.getElementsByTagName("pre");
for (var i = 0; i < pres.length; i++) {
  pres[i].addEventListener("dblclick", function () {
    var selection = getSelection();
    var range = document.createRange();
    range.selectNodeContents(this);
    selection.removeAllRanges();
    selection.addRange(range);
  }, false);
}
</script>
<script type='text/javascript'>
//<![CDATA[
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Rahmat Arif | URL http://rahmatarifish.blogspot.com 
 */
(function () {
    // Private helper vars
    var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
    var _ = self.Prism = {
        languages: {
            insertBefore: function (inside, before, insert, root) {
                root = root || _.languages;
                var grammar = root[inside];
                var ret = {};
                for (var token in grammar) {
                    if (grammar.hasOwnProperty(token)) {
                        if (token == before) {
                            for (var newToken in insert) {
                                if (insert.hasOwnProperty(newToken)) {
                                    ret[newToken] = insert[newToken];
                                }
                            }
                        }
                        ret[token] = grammar[token];
                    }
                }
                return root[inside] = ret;
            },
            DFS: function (o, callback) {
                for (var i in o) {
                    callback.call(o, i, o[i]);
                    if (Object.prototype.toString.call(o) === '[object Object]') {
                        _.languages.DFS(o[i], callback);
                    }
                }
            }
        },
        highlightAll: function (async, callback) {
            var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
            for (var i = 0, element; element = elements[i++];) {
                _.highlightElement(element, async === true, callback);
            }
        },
        highlightElement: function (element, async, callback) {
            // Find language
            var language, grammar, parent = element;
            while (parent && !lang.test(parent.className)) {
                parent = parent.parentNode;
            }
            if (parent) {
                language = (parent.className.match(lang) || [, ''])[1];
                grammar = _.languages[language];
            }
            if (!grammar) {
                return;
            }
            // Set language on the element, if not present
            element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
            // Set language on the parent, for styling
            parent = element.parentNode;
            if (/pre/i.test(parent.nodeName)) {
                parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
            }
            var code = element.textContent.trim();
            if (!code) {
                return;
            }
            code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\u00a0/g, ' ');
            //console.time(code.slice(0,50));
            var env = {
                element: element,
                language: language,
                grammar: grammar,
                code: code
            };
            _.hooks.run('before-highlight', env);
            if (async && self.Worker) {
                var worker = new Worker(_.filename);
                worker.onmessage = function (evt) {
                    env.highlightedCode = Token.stringify(JSON.parse(evt.data));
                    env.element.innerHTML = env.highlightedCode;
                    callback && callback.call(env.element);
                    //console.timeEnd(code.slice(0,50));
                    _.hooks.run('after-highlight', env);
                };
                worker.postMessage(JSON.stringify({
                    language: env.language,
                    code: env.code
                }));
            } else {
                env.highlightedCode = _.highlight(env.code, env.grammar)
                env.element.innerHTML = env.highlightedCode;
                callback && callback.call(element);
                _.hooks.run('after-highlight', env);
                //console.timeEnd(code.slice(0,50));
            }
        },
        highlight: function (text, grammar) {
            return Token.stringify(_.tokenize(text, grammar));
        },
        tokenize: function (text, grammar) {
            var Token = _.Token;
            var strarr = [text];
            var rest = grammar.rest;
            if (rest) {
                for (var token in rest) {
                    grammar[token] = rest[token];
                }
                delete grammar.rest;
            }
            tokenloop: for (var token in grammar) {
                if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                    continue;
                }
                var pattern = grammar[token],
                    inside = pattern.inside,
                    lookbehind = !! pattern.lookbehind || 0;
                pattern = pattern.pattern || pattern;
                for (var i = 0; i < strarr.length; i++) { // Don’t cache length as it changes during the loop
                    var str = strarr[i];
                    if (strarr.length > text.length) {
                        // Something went terribly wrong, ABORT, ABORT!
                        break tokenloop;
                    }
                    if (str instanceof Token) {
                        continue;
                    }
                    pattern.lastIndex = 0;
                    var match = pattern.exec(str);
                    if (match) {
                        if (lookbehind) {
                            lookbehind = match[1].length;
                        }
                        var from = match.index - 1 + lookbehind,
                            match = match[0].slice(lookbehind),
                            len = match.length,
                            to = from + len,
                            before = str.slice(0, from + 1),
                            after = str.slice(to + 1);
                        var args = [i, 1];
                        if (before) {
                            args.push(before);
                        }
                        var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match);
                        args.push(wrapped);
                        if (after) {
                            args.push(after);
                        }
                        Array.prototype.splice.apply(strarr, args);
                    }
                }
            }
            return strarr;
        },
        hooks: {
            all: {},
            add: function (name, callback) {
                var hooks = _.hooks.all;
                hooks[name] = hooks[name] || [];
                hooks[name].push(callback);
            },
            run: function (name, env) {
                var callbacks = _.hooks.all[name];
                if (!callbacks || !callbacks.length) {
                    return;
                }
                for (var i = 0, callback; callback = callbacks[i++];) {
                    callback(env);
                }
            }
        }
    };
    var Token = _.Token = function (type, content) {
            this.type = type;
            this.content = content;
        };
    Token.stringify = function (o) {
        if (typeof o == 'string') {
            return o;
        }
        if (Object.prototype.toString.call(o) == '[object Array]') {
            for (var i = 0; i < o.length; i++) {
                o[i] = Token.stringify(o[i]);
            }
            return o.join('');
        }
        var env = {
            type: o.type,
            content: Token.stringify(o.content),
            tag: 'span',
            classes: ['token', o.type],
            attributes: {}
        };
        if (env.type == 'comment') {
            env.attributes['spellcheck'] = 'true';
        }
        _.hooks.run('wrap', env);
        var attributes = '';
        for (var name in env.attributes) {
            attributes += name + '="' + (env.attributes[name] || '') + '"';
        }
        return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';
    };
    if (!self.document) {
        // In worker
        self.addEventListener('message', function (evt) {
            var message = JSON.parse(evt.data),
                lang = message.language,
                code = message.code;
            self.postMessage(JSON.stringify(_.tokenize(code, _.languages[lang])));
            self.close();
        }, false);
        return;
    }
    // Get current script and highlight
    var script = document.getElementsByTagName('script');
    script = script[script.length - 1];
    if (script) {
        _.filename = script.src;
        if (document.addEventListener && !script.hasAttribute('data-manual')) {
            document.addEventListener('DOMContentLoaded', _.highlightAll);
        }
    }
})();
Prism.languages.markup = {
    'comment': /&lt;!--[\w\W]*?--(&gt;|&gt;)/g,
    'prolog': /&lt;\?.+?\?&gt;/,
    'doctype': /&lt;!DOCTYPE.+?&gt;/,
    'cdata': /&lt;!\[CDATA\[[\w\W]+?]]&gt;/i,
    'tag': {
        pattern: /&lt;\/?[\w:-]+\s*[\w\W]*?&gt;/gi,
        inside: {
            'tag': {
                pattern: /^&lt;\/?[\w:-]+/i,
                inside: {
                    'punctuation': /^&lt;\/?/,
                    'namespace': /^[\w-]+?:/
                }
            },
            'attr-value': {
                pattern: /=(('|")[\w\W]*?(\2)|[^\s>]+)/gi,
                inside: {
                    'punctuation': /=/g
                }
            },
            'punctuation': /\/?&gt;/g,
            'attr-name': {
                pattern: /[\w:-]+/g,
                inside: {
                    'namespace': /^[\w-]+?:/
                }
            }
        }
    },
    'entity': /&amp;#?[\da-z]{1,8};/gi
};
// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {
    if (env.type === 'entity') {
        env.attributes['title'] = env.content.replace(/&amp;/, '&');
    }
});
Prism.languages.css = {
    'comment': /\/\*[\w\W]*?\*\//g,
    'atrule': /@[\w-]+?(\s+.+)?(?=\s*{|\s*;)/gi,
    'url': /url\((["']?).*?\1\)/gi,
    'selector': /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
    'property': /(\b|\B)[a-z-]+(?=\s*:)/ig,
    'string': /("|')(\\?.)*?\1/g,
    'important': /\B!important\b/gi,
    'ignore': /&(lt|gt|amp);/gi,
    'punctuation': /[\{\};:]/g
};
if (Prism.languages.markup) {
    Prism.languages.insertBefore('markup', 'tag', {
        'style': {
            pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
            inside: {
                'tag': {
                    pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
                    inside: Prism.languages.markup.tag.inside
                },
                rest: Prism.languages.css
            }
        }
    });
}
Prism.languages.javascript = {
    'comment': {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
        lookbehind: true
    },
    'string': /("|')(\\?.)*?\1/g,
    'regex': {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: true
    },
    'keyword': /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,
    'boolean': /\b(true|false)\b/g,
    'number': /\b-?(0x)?\d*\.?\d+\b/g,
    'operator': /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,
    'ignore': /&(lt|gt|amp);/gi,
    'punctuation': /[{}[\];(),.:]/g
};
if (Prism.languages.markup) {
    Prism.languages.insertBefore('markup', 'tag', {
        'script': {
            pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
            inside: {
                'tag': {
                    pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
                    inside: Prism.languages.markup.tag.inside
                },
                rest: Prism.languages.javascript
            }
        }
    });
}
Prism.languages.java = {
    'comment': {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
        lookbehind: true
    },
    'string': /("|')(\\?.)*?\1/g,
    'keyword': /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
    'boolean': /\b(true|false)\b/g,
    'number': /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\W\d*\.?\d+\b/gi,
    'operator': {
        pattern: /([^\.]|^)([-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|%|\^|(&lt;){2}|($gt;){2,3}|:|~)/g,
        lookbehind: true
    },
    'ignore': /&(lt|gt|amp);/gi,
    'punctuation': /[{}[\];(),.:]/g,
};

//]]>
</script>
<script>
$('pre').attr('class', 'line-numbers');
Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode;if(!t||!/pre/i.test(t.nodeName)||t.className.indexOf("line-numbers")===-1){return}var n=1+e.code.split("\n").length;var r;lines=new Array(n);lines=lines.join("<span></span>");r=document.createElement("span");r.className="line-numbers-rows";r.innerHTML=lines;if(t.hasAttribute("data-start")){t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)}e.element.appendChild(r)})
</script>