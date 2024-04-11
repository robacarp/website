---
title: A Price is Right search in JavaScript
date: 2024-04-11 11:52:44
tags: javascript algorithms
layout: post
guid: 897783F9-B297-4B1E-B015-DEEC27125899
---

On [Archive.fm](https://archive.fm) I needed an array search feature which would return the item which matches the closest without going over -- price is right rules for an array search.

Here's the JavaScript implementation I came up with:

```javascript

Array.prototype.priceIsRightSearch = function (comparison) {
  let left = 0
  let right = this.length - 1
  let moved = true
  while (moved) {
    moved = false
    const mid = Math.floor((left + right) / 2)
    const comparisonResult = comparison(this[mid])

    if (left != mid && comparisonResult < 0) {
      moved = true
      left = mid
    } else if (right != mid && comparisonResult > 0) {
      moved = true
      right = mid
    } else {
      return mid
    }
  }
  return left
}

```

And here is how you use it:

```javascript
const currentTimeOffset = 85.26
const offsetBrackets = [
  0, 39.94, 59.16, 83.26, 104.25, 124.24, 146.3, 164.14,
  176.18, 187.22, 206.42, 237.62, 249.62, 270.5, 297.14,
  323.26, 359.54, 374.54, 405.76, 429.26, 455.5, 487.46,
  530.1, 564.82, 593.38, 606.34, 646.24, 668.76, 702.42,
  712.28, 739.4, 772.12, 788, 811.96, 838.08, 857.76,
  885.4
]

const closestBracketWithoutGoingOver = this.spanTimeOffsets.priceIsRightSearch((currentValue) => {
  return currentValue - currentTimeOffset
})

console.log(`The closest time without going over is ${closestBracketWithoutGoingOver}`)
```
