# README

- Markdown support...
  - https://pugjs.org/language/filters.html
  - https://expressjs.com/en/advanced/developing-template-engines.html#developing-template-engines-for-express
  - https://github.com/expressjs/express/blob/master/examples/markdown/index.js
  - https://dev.to/khalby786/creating-a-markdown-blog-with-ejs-express-j40
  - https://julianterenzio.io/blog/Building%20A%20Markdown%20Blog%20App%20with%20Express%20and%C2%A0EJS
  - https://dev.to/patarapolw/pug-with-markdown-is-magic-yet-underrated-4dla
- JSDoc support...
  - https://gils-blog.tayar.org/posts/jsdoc-typings-all-the-benefits-none-of-the-drawbacks/
  - https://www.prisma.io/blog/type-safe-js-with-jsdoc-typeSaf3js
- Tailwind support...
  - https://tailwindcss.com/docs/installation/play-cdn
- Error handling...
  - See the `wrap` function in `src/utils.js` which is the start of a solution for async error handling.
  - The boilerplate from express-generator (with pug) has some error handling included, so look there for inspiration.
- Testing...
  - E2E testing should be first priority. Probably want to use Cypress, but there might be something more lightweight.
  - Unit testing should be second priority. See if we can avoid Jest and use something more lightweight.
