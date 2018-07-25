# deep-object-search
Performs a traversal on a tree object.

Install
=======
`npm install deep-object-search --save`

Usage
=====
```javascript
import deepSearch from 'deep-object-search'

let tree = {
  body: {
    data: {
      firstname: 'Norman',
      lastname: 'Carcamo',
      house:399,
      games: {
        console: true,
        gameboy: undefined,
        physic: null
      }
    }
  },
  sports: {
    tennis: true,
    basketball: true,
    football: true,
    rugby: false,
  }
}

deepSearch(tree, 'body.data.games.console')
/* output:
{
  "found": true,
  "search": "body.data.games",
  "value": true,
  "parent": {
    "name": "body",
    "content": {
      "data": {
        "firstname": "Norman",
        "lastname": "Carcamo",
        "house": 399,
        "games": {
          "console": true,
          "physic": null
        }
      }
    }
  },
  "path": "root.body.data.body.data.games"
}
*/
```

**deepSearch(object, path, options)**

* `object` {Object} The "tree" to search.
* `path` {String} Used to search a path or a key name.
* `options` {Object} An optional object to change the root key name.
    * `rootLabel` {String} The name of the first key appended to the end path. Defaults to `root`.
