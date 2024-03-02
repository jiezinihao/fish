
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it'
import javascript from 'highlight.js/lib/languages/javascript';

const md:any = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 得到经过highlight.js之后的html代码
        const preCode = hljs.highlight(lang, str, true).value;
       
        return preCode;
      } catch (__) {}
    }
  },
});

export default  md