import { AppRouter } from '@rpc-in-ts/server'

type ProxyCallback = (args: unknown[]) => unknown

export function createClientProxy<R extends AppRouter>(url: string): R {
  const proxy = new Proxy({} as R, {
    get(_, key) {
      return createInnerProxy(async (args) => {
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
 * 创建一个新的代理对象返回给调用方
 * 返回值是一个函数，调用该函数会触发代理对象的 apply 方法
 * 获取到传入的参数后，调用 callback
 * @param callback
 * @returns
 */
function createInnerProxy(callback: ProxyCallback) {
  return new Proxy(callback, {
    apply(_1, _2, args) {
      return callback(args)
    }
  })
}
