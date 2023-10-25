import { AppRouter } from '@rpc-in-ts/server'

type ProxyCallback = (args: unknown[]) => unknown

export function createClientProxy<R extends AppRouter>(url: string): R {
  const proxy = new Proxy({} as R, {
    get(_, key) {
      return createRecursiveProxy(async (args) => {
        const result = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            method: key,
            args: args
          })
        })
        const json = await result.json()
        if (json.status) {
          return json.data
        } else {
          return null
        }
      })
    }
  })
  return proxy
}

/**
 * 递归创建代理，目的是拿到函数的参数
 * @param callback
 * @returns
 */
function createRecursiveProxy(callback: ProxyCallback) {
  return new Proxy(() => {}, {
    get() {
      return createRecursiveProxy(callback)
    },
    apply(_1, _2, args) {
      return callback(args)
    }
  })
}
