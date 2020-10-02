const {$, eqNull, print, mget, mlen, mset, mdelete} = require('lesscode-fp')

const LRUCache = capacity => ({ capacity, map: new Map() })

const LRUput = key => val => lru => (!$(eqNull, mget(key)(lru.map)))
    ? $(mset(key)(val), mdelete(key))(lru.map)
    : (mlen(lru.map) >= lru.capacity)
        ? $(mset(key)(val), mdelete(mheadKey(lru.map)))(lru.map)
        : lru.map.set(key, val)

const LRUget = key => lru => (!eqNull(lru.map.get(key))) ? $(mget(key), mset(key)(lru.map.get(key)), mdelete(key))(lru.map) : null 

// Test

const Cache = LRUCache(2)
LRUput(1)(1)(Cache)
print(LRUget(1)(Cache))