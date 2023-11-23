# README

## ChatGPT Prompt That Helped Me Get Started

Help me set up an express server with the following goals...

1. Assume that we are using a modern version of Node (e.g. 20.9.0) with ES modules enabled (e.g. "type": "module")
2. Use Pug as the view engine
3. Endpoints will primarily return HTML and HTML partials, rather than JSON.
4. The HTML returned from the backend will be enriched with HTMX attributes, as HTMX will be the primary method of adding frontend logic and interactivity.
5. Dependencies will be installed with npm, rather than using CDN links.
6. Backend code and frontend code should live together in the same repository, but should have clear logical separation. They should not share a node_modules folder. I understand that this technically makes my project a "monorepo", but I would prefer to avoid using any dedicated monorepo tooling. However, I am open to the idea if you think it would be better in the long run and wouldn't introduce too much operational complexity.
7. TypeScript will be utilized on both the frontend and backend via JSDoc comments so that transpiling .ts files to .js files is avoided.
8. Utilize Tailwind v3 for styling. I understand that a typical Tailwind setup requires a build step, either using the Tailwind CLI or using Tailwind as a PostCSS plugin, but the benefits of Tailwind are worth introducing a small amount of operational complexity.
9. Besides using Tailwind to build the final CSS output, ideally the frontend should not require bundling or other build steps. Rather, it should rely on native browser support for ES modules. Even if dependencies from npm are being used for the frontend, it should all just work, even if that means that I have to restrict myself to only using libraries that are built using ES modules.

In addition the the above requirements, I would like my initial project setup to essentially be a "hello world" application, except that it should be slightly more involved so that I can quickly verify that each of the requirements above is being satisfied.

## Notes

- Markdown support...
  - https://pugjs.org/language/filters.html
  - https://expressjs.com/en/advanced/developing-template-engines.html#developing-template-engines-for-express
  - https://github.com/expressjs/express/blob/master/examples/markdown/index.js
  - https://dev.to/khalby786/creating-a-markdown-blog-with-ejs-express-j40
  - https://julianterenzio.io/blog/Building%20A%20Markdown%20Blog%20App%20with%20Express%20and%C2%A0EJS
  - https://dev.to/patarapolw/pug-with-markdown-is-magic-yet-underrated-4dla
