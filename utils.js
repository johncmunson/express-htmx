// Wrapper that catches rejected promises and calls next() with the error as the first argument
// https://zellwk.com/blog/async-await-express/
// https://expressjs.com/en/advanced/best-practice-performance.html#use-promises
export const wrap = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next)
}
