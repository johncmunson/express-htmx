/**
 * Wraps an asynchronous Express route handler to catch errors and pass them to the next middleware.
 * - https://zellwk.com/blog/async-await-express/
 * - https://expressjs.com/en/advanced/best-practice-performance.html#use-promises
 * @param {Function} fn - An asynchronous route handler function.
 * @returns {(req: any, res: any, next: Function) => void} A function that takes Express request, response, and next function as arguments.
 */
export const wrap = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next)
}
