import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import addClasses from 'rehype-add-classes'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import stringify from 'rehype-stringify'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import remarkUnwrapImages from 'remark-unwrap-images'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { z } from 'zod'

const Frontmatter = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string().min(1)).min(1),
  coverPhoto: z
    .string()
    .optional()
    .refine((str) =>
      str
        ? str.endsWith('.png') || str.endsWith('.jpg') || str.endsWith('.webp')
        : true
    ),
  // series: z.string().optional(),
})

const PublishDate = z.string().regex(/20\d{2}-[01]\d-[0123]\d/)

const postsDirectory = join(process.cwd(), 'content')

/**
 * Get all the tags of the blog posts
 *
 * @param {boolean} includeDrafts - whether to include tags from drafts in the list of slugs
 * @returns {Record<string, number>}
 */
export function getTags(includeDrafts = false) {
  let allPosts = getThisManyPosts(undefined, includeDrafts)

  // Reduce the posts to a single object that contains the tags and their counts
  const tagCounts = allPosts.reduce((acc, post) => {
    post.frontmatter.tags.forEach((tag) => {
      if (acc[tag]) {
        acc[tag]++
      } else {
        acc[tag] = 1
      }
    })
    return acc
  }, /** @type {Record<string, number>} */ ({}))

  return tagCounts
}

/**
 * Get all the slugs of the blog posts
 *
 * @param {'ascending' | 'descending'} sortOrder - the order in which to sort the slugs
 * @param {boolean} includeDrafts - whether to include drafts in the list of slugs
 * @returns {string[]}
 */
export function getSlugs(sortOrder = 'descending', includeDrafts = false) {
  return fs
    .readdirSync(postsDirectory)
    .map((slug) => slug.replace(/\.md$/, ''))
    .sort((slug1, slug2) => {
      if (sortOrder === 'ascending') return slug1.localeCompare(slug2)
      return slug2.localeCompare(slug1)
    })
    .filter((slug) => {
      if (includeDrafts) return true
      return !slug.startsWith('DRAFT')
    })
}

/**
 * Get the next slug
 *
 * @param {string} slug - the slug of the post
 * @returns {string | undefined}
 */
export function getNextSlug(slug) {
  const slugs = getSlugs()
  const index = slugs.indexOf(slug)
  return slugs[index + 1]
}

/**
 * Get the previous slug
 *
 * @param {string} slug - the slug of the post
 * @returns {string | undefined}
 */
export function getPrevSlug(slug) {
  const slugs = getSlugs()
  const index = slugs.indexOf(slug)
  return slugs[index - 1]
}

export class Post {
  /**
   * Creates an instance of the Post class.
   * @param {string} slug The slug of the post used to locate the markdown file
   */
  constructor(slug) {
    const content = fs.readFileSync(postsDirectory + '/' + slug + '.md', 'utf8')

    const { data: frontmatter, content: markdown } = matter(content)
    const validatedFrontmatter = Frontmatter.safeParse(frontmatter)
    if (!validatedFrontmatter.success) {
      throw new Error(
        `Error parsing the frontmatter for post '${slug}': ${JSON.stringify(
          validatedFrontmatter.error.issues
        )}`
      )
    }

    const publishDate = slug.startsWith('DRAFT') ? null : slug.slice(0, 10)
    if (publishDate) {
      const validatedPublishDate = PublishDate.safeParse(publishDate)
      if (!validatedPublishDate.success) {
        throw new Error(
          `Error parsing the publish date for post '${slug}': ${JSON.stringify(
            validatedPublishDate.error.issues
          )}`
        )
      }
    }

    /**
     * @type {string} The slug of the post
     * @example /2020-01-01-my-first-post
     */
    this.slug = slug
    /**
     * @type {string} The URL of the post
     * @example /posts/2020-01-01-my-first-post
     */
    this.url = `/content/${slug}`
    /**
     * @type {typeof validatedFrontmatter.data} The frontmatter (metadata) extracted from the markdown file
     */
    this.frontmatter = validatedFrontmatter.data
    /**
     * @type {string} The content of the post in markdown format
     */
    this.markdown = markdown
    /**
     * @type {string | null} The publish date of the post
     */
    this.publishDate = publishDate
    /**
     * @type {boolean} Whether the post is a draft
     */
    this.draft = !publishDate
    /**
     * @type {string | null} The HTML representation of the post
     */
    this._html = null
  }

  /**
   * @returns {string} Getter for the HTML representation of the post
   */
  get html() {
    if (this._html) return this._html

    const html = unified()
      // Parse the markdown
      .use(parse)
      // Markdown parsers often wrap images in a paragraph, e.g. <p><img /></p>
      // This is kinda weird and I don't like it. So, unwrap the images.
      .use(remarkUnwrapImages)
      // Convert the markdown to HTML. Also, allow writing HTML directly in the markdown.
      // https://github.com/remarkjs/remark-rehype#example-supporting-html-in-markdown-properly
      .use(remark2rehype, { allowDangerousHtml: true })
      // Might not need this... check to see what it was used for in the old blog
      // .use(
      //   rehypeSanitize,
      //   // The default sanitation behavior is a little aggressive, so we need to explicitly tell it to allow through
      //   // certain attributes.
      //   deepmerge(defaultSchema, {
      //     attributes: {
      //       '*': ['class', 'className', 'dataCy'],
      //       img: ['alt'],
      //     },
      //   })
      // )
      // Add some styles
      // Prefer top and left margins, b/c Adam says so -> https://twitter.com/adamwathan/status/1399473286224957442
      // Also, we're not including h1 because the title of blog posts is already an h1 and we don't want multiple
      // h1 tags on the page. We're not including h3 through h6 because there's really no reason to ever use those
      // tags in a blog post. We just need a single heading tag (h2).
      .use(addClasses, {
        h2: 'mt-8 font-medium text-lg h2-with-hash',
        p: 'mt-4',
        img: 'mt-6 w-full h-auto rounded-md border border-neutral-300 dark:border-neutral-600',
        ul: 'mt-4 list-disc list-inside',
        ol: 'mt-4 list-decimal list-inside',
      })
      // Add self-referencing links to the headers
      //   - rehypeSlug simply adds id's to headers
      //   - rehypeAutolinkHeadings takes headings that have id's and wraps their text content with an anchor tag
      //     linking back to itself
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
      // All images to have a captions
      .use(rehypeImgToFigCap)
      // Convert the HTML to a string
      .use(stringify)
      // Kick off the process
      .processSync(this.markdown)
      // Apparently we need to convert to a string again
      .toString()

    this._html = html

    return this._html
  }
}

// This plugin will search for img elements and replace them with a figure element that contains the img and a
// figcaption if the image has an alt attribute.
function rehypeImgToFigCap() {
  /**
   * The transformer function that manipulates the AST.
   * @param {any} tree The root of the AST, treated as a generic object.
   */
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img') {
        const imgNode = node
        const figureNode = {
          type: 'element',
          tagName: 'figure',
          children: [imgNode],
        }

        // If there's an alt text, add a figcaption
        if (imgNode.properties && imgNode.properties.alt) {
          const figcaptionNode = {
            type: 'element',
            tagName: 'figcaption',
            properties: {
              className: 'mt-1 text-sm italic',
            },
            children: [{ type: 'text', value: imgNode.properties.alt }],
          }

          figureNode.children.push(figcaptionNode)
        }

        // Replace the img with the figure in the parent node
        if (parent) {
          parent.children.splice(index, 1, figureNode)
        }
      }
    })
  }
}

/**
 * Get X number of posts
 *
 * @param {number} [count] - the number of posts to get
 * @param {boolean} [includeDrafts] - whether to include drafts in the list of posts
 * @returns {Post[]}
 */
export function getThisManyPosts(count, includeDrafts = false) {
  try {
    let slugs = getSlugs(undefined, includeDrafts)

    return slugs.slice(0, count).map((slug) => new Post(slug))
  } catch (error) {
    console.error('Error getting first three posts: ', error)
    throw error
  }
}

/**
 * Get a page of blog posts
 *
 * @param {number} [page] - the page number to get
 * @param {number} [postsPerPage] - how many posts per page
 * @param {string} [tag] - the tag to filter the posts by
 * @returns {Post[]}
 */
export function getPaginatedPosts(page = 1, postsPerPage = 4, tag = undefined) {
  try {
    const slugs = getSlugs()
    const start = (page - 1) * postsPerPage
    const end = start + postsPerPage

    if (!tag) {
      return slugs.slice(start, end).map((slug) => new Post(slug))
    }

    const filteredPosts = slugs
      .map((slug) => new Post(slug))
      .filter((post) => post.frontmatter.tags.includes(tag))

    return filteredPosts.slice(start, end)
  } catch (error) {
    console.error('Error getting paginated posts: ', error)
    throw error
  }
}
