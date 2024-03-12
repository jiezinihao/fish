
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it'
const md: any = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 得到经过highlight.js之后的html代码
        const preCode = hljs.highlight(str || '', { language: lang }).value;

        return preCode;
      } catch (__) { }
    }
    return str
  },
});

export default md