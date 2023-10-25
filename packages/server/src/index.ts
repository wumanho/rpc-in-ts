export * from './http'
export * from './router'
import { defineRouter } from './router'
import { createHttpServer } from './http'

const router = defineRouter({
  a: (a: string) => {
    return a
  }
})

export type AppRouter = typeof router

createHttpServer({
  router: router
}).listen(3721)
