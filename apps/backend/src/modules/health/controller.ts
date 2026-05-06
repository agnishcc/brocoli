import 'reflect-metadata'
import { Service } from 'typedi';
import { BaseController } from '../../manager/baseController';
import { Context } from 'hono';


@Service()
export class HealthController extends BaseController {
    async aliveCheck(c: Context) {
        return this.jsonResponse(c, { status: 'UP', message: 'Alive check is successful' }, 'Alive check is successful', 200)
    }

    async healthCheck() {
        return {
            status: 'UP',
            message: 'Health check is successful',
            uptime: process.uptime(),
        };
    }
}