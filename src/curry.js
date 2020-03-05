/**
 * Каррирование - трансформация функции из fn(1,2,3) в fn(1)(2)(3)
 * @param {Function} fn 
 */
const curry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn.apply(null, args)
    }

    return (...args2) => {
      return curried.apply(null, args.concat(args2))
    }
  }

  return curried
}

export default curry
