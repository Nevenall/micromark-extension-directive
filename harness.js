var fs = require('fs')
var micromark = require('micromark')
var syntax = require('./lib/index')
var html = require('./lib/html')


var text = `
# Here's some example markdown

:::spoiler
He dies.
:::
`

// let text = `
// ::: noparse div outer
// # Header One

// Outer contents.

//  ::: div inner
//  Inner contents. 
//  :::

// More outer contents.
// ::: 
// `


var result = micromark(text, {
   extensions: [syntax()],
   htmlExtensions: [html({ spoiler: spoiler })]
})

console.log(result)

function spoiler(d) {
   if (d.type !== 'containerDirective') return false

   this.tag('<abbr')

   if (d.attributes && 'title' in d.attributes) {
      this.tag(' title="' + this.encode(d.attributes.title) + '"')
   }

   this.tag('>')
   this.raw(d.label || '')
   this.tag('</abbr>')
}