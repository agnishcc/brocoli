import { Hono } from 'hono'
import { Apps } from '@repo/db/schema/app'
import { client } from '@repo/db/db'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')

})


export default app