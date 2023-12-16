# README

## Technical Notes

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
- Config management and separation of concerns...
  - See how express-generator does it in the `www/bin` file.
- Dev server and hot reloading
- So far, the assumption is that frontend interactivity will be handled by HTMX (and possilby \_hyperscript) and therefore no JS will be written. However, if this changes, we may need a separate JSConfig file for the frontend. Scripts might get added to the public folder, e.g. `public/javascripts/custom.js`. Regardless, we still want to completely avoid frontend build steps or bundling.
- So far, the assumption is that all CSS will be written using Tailwind. However, we will likely need the ability for custom CSS. Should be straightforward though. e.g. `public/stylesheets/custom.css`.
- Tailwind is awesome, but it's kinda heavy since we're loading it from a CDN and we're not allowing ourselves to use the Tailwind CLI to purge unused styles because that would introduce a build step. Maybe, just maybe, consider using [missing.css](https://missing.style/) which is a classless CSS framework from the creators of htmx.
- We're currently using Pug as the view engine. However, it would be pretty slick to use JSX as the view engine instead, because...
  - JSX is familiar, easy, and powerful
  - Since we're writing HTML inside of JS, and not the other way around, we can add type safety to the view layer
  - https://blakewilliams.me/posts/type-safe-server-side-templates-with-express-jsx-react

## Routes

/
/?page=2
/posts
/posts/?page=2
/posts/2022-01-01-lorem-ipsum
/about
/newsletter
/popular
/contact
/tags
/tags/tag-name
/feed.xml
/sitemap.xml

And, I could also add some fun stuff like below. It wouldn't have to be part of the main navigation, but it could be a fun easter egg. Even though it's mainly a blog, I could still have some fun with it. It's my website, after all.

- https://taylor.town/wish-manifesto
- https://taylor.town/now
- https://taylor.town/hire-me
- https://taylor.town/about

## Priorities

0. Save nice styling for last. Focus on functionality first.
1. Static homepage - 5 hrs
2. Static post page - 5 hrs
3. Markdown engine - 5 hrs
4. Make it work (including pagination and next/prev links) - 2 hrs
5. Popular posts (static, then make it work) - 2 hrs
6. Newsletter (static, then make it work)
7. Contact (static, then make it work)
8. About
9. Tags (static, then make it work)
10. 404
11. RSS
12. Analytics, Visitor count
13. SEO, Sitemap, Robots.txt, Favicons
14. Dark mode
15. Comments (static, then make it work)

## Google Doc

https://docs.google.com/document/d/1BkCQu31SdqMYFazJbzlZIp9FNmFkyL_aKWWbfKIZQtY/edit
