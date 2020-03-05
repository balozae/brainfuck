import assert from 'assert'
import curry from './curry'

describe('curry', () => {
  const abc = (a, b, c) => [a, b, c]
  const sum = (a, b) => a + b

  it('should be called through comma delimited list and return array', () => {
    const curried = curry(abc)
    const expected = [1, 2, 3]

    assert.deepEqual(curried(1, 2)(3), expected)
    assert.deepEqual(curried(1)(2, 3), expected)
    assert.deepEqual(curried(1)(2)(3), expected)
    assert.deepEqual(curried(1, 2, 3), expected)
  })

  it('should return sum', () => {
    const curried = curry(sum)

    assert.equal(curried(2, 3), 5)
    assert.equal(curried(2)(2), 4)
  })
})
