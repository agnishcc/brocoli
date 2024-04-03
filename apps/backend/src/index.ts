import { Hono } from 'hono'
import routers from './manager/router.module'
const app = new Hono()

routers.map((router) => {
  app.route("/", router.router)
})

export default app