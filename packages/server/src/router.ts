export type Router = {
  [key: string]: Function
}

type RouterConfig<T> = {
  [key in keyof T]: T[key]
}

export function defineRouter<R extends Router>(config: R): RouterConfig<typeof config> {
  const router = Object.assign(Object.create(null), config)
  return router
}
