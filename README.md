# README

## Google Doc

https://docs.google.com/document/d/1BkCQu31SdqMYFazJbzlZIp9FNmFkyL_aKWWbfKIZQtY/edit

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

## Header / Footer

**Header**

- [x] Popular Posts
- [x] Newsletter
- [x] RSS
- [x] About Page
- [x] Contact
- [x] Dark Mode Toggle
- [ ] Optional: Projects (These could probably just go on the About Page tbh. Probably wouldn’t need a Projects page unless I really had a bunch of projects and it warranted a dedicated page.)

**Footer**

- Keep it simple. Probably don’t need to duplicate the stuff in the header.
- [x] Inspirational quote
- [x] Newsletter CTA

## Routes

_Note_: paginated true means `?page=2`

**Homepage**

- Right Now:
  - [x] about blurb
  - [x] recent articles
  - [x] link to "all posts" page
- In the future:
  - [ ] popular articles
  - [ ] projects
- Paginated: false
- URL: `/`

**All Posts**

- Right Now:
  - [x] a list of all the posts
  - [ ] ...sorted by publish date
- Paginated: true
- URL: `/posts`

**Popular Posts**

We'll just utilize the tag system and the "popular" tag to create the Popular Posts page

**Blog Post Page**

- Right Now:
  - Frontmatter
    - [ ] Publish date
    - [ ] Title
    - [ ] URL
      - don't derive the URL from the title, as it could change in the future
      - should the publish date be part of the URL?
    - [ ] Tags
    - [ ] Cover Photo
    - [ ] Summary
    - Body content
      - [ ] Written in markdown
      - [ ] Styled nicely
      - [ ] Supports headers and images and all the other standard markdown stuff
    - [ ] Next / Previous links
- In the future:
  - syntax highlighting for code snippets
  - comments section
  - Only on desktop view...
    - Autolinked headers (subheaders not allowed)
    - ToC if there are more than 5 headers
    - popular articles
    - recent articles
    - projects
- Paginated: false
- URL: `/posts/2022-01-01-lorem-ipsum`

**About Page**

- Right Now:
  - [ ] A more detailed version of the blurb on the homepage
  - [ ] Photo
  - [ ] Social links
  - Etc.
- Paginated: false
- URL: `/about`

**Newsletter**

- Right now:
  - [ ] Describe what the newsletter is about
  - [ ] Provide a list of all old newsletters (if they aren’t just repackaged blog posts)
  - [ ] Newsletter CTA
- Paginated: false
- URL: `/newsletter`

**Contact**

- Right now:
  - Contact form
- Paginated: false
- URL: `/contact`

**Tags Page**

- Right now:
  - An alphabetical list of all the tags in use on the blog
  - Each tag has a number for how many times it has been used
- Paginated: false
- URL: `/posts/tags`

**Individual Tag Page**

- Right now:
  - The name of the tag
  - A list of all of the posts using that tag
- Paginated: false
- URL: `/posts/tags/lorem-upsum`

**Other Misc Pages**

- feed.xml
- sitemap.xml
- 404
- robots

And, I could also add some fun stuff like below. It wouldn't have to be part of the main navigation, but it could be a fun easter egg. Even though it's mainly a blog, I could still have some fun with it. It's my website, after all.

- https://taylor.town/wish-manifesto
- https://taylor.town/now
- https://taylor.town/hire-me
- https://taylor.town/about

## Priorities

0. Save nice styling for last. Focus on functionality first.
1. Dev server and live reloading
2. Static homepage - 5 hrs
3. Static post page - 5 hrs
4. Markdown engine - 5 hrs
5. Make it work (including pagination and next/prev links) - 2 hrs
6. Popular posts (static, then make it work) - 2 hrs
7. Newsletter (static, then make it work)
8. Contact (static, then make it work)
9. About
10. Tags (static, then make it work)
11. 404
12. RSS
13. Analytics, Visitor count
14. SEO, Sitemap, Robots.txt, Favicons
15. Dark mode
16. Comments (static, then make it work)
