import http from 'http'
import { Server } from 'http'
import { Router } from './router'

interface HttpServerOptions {
  router: Router
}

/**
 * 创建 http 服务
 * @param opts 默认只有路由参数
 * @returns http server 实例
 */
export function createHttpServer(opts: HttpServerOptions): Server {
  const handler = createHttpHandler(opts)
  return http.createServer((req, res) => handler(req, res))
}

// 请求回调
function createHttpHandler(opts: HttpServerOptions) {
  return async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const body = await getBody(req)
    if (!body.status) {
      res.end(JSON.stringify({ status: false }))
      return
    }
    const path = body.data.method
    const { router } = opts
    // 调用方法
    if (router[path] && typeof router[path] === 'function') {
      const result = await router[path](...body.data.args)
      res.end(
        JSON.stringify({
          status: true,
          data: result
        })
      )
    }
  }
}

/**
 * 获取 http 请求体
 * @param req node 请求对象
 * @returns
 */
interface BodyResult {
  status: Boolean
  data: any
}
async function getBody(req: http.IncomingMessage): Promise<BodyResult> {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      resolve({
        status: true,
        data: JSON.parse(body)
      })
    })
  })
}
