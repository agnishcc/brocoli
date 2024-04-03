import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import 'reflect-metadata';
import { Service } from 'typedi';

@Service()
export class BaseController {
    jsonResponse(c: Context, data: any, message = 'Success', statusCode: StatusCode = 200) {
        console.log('Success:', statusCode);
        c.status(statusCode);
        return c.json({
            data,
            message,

        });
    }

    listReponse(
        c: Context,
        data: any,
        statusCode: StatusCode = 200,
        message = 'Success',
        pagination: {
            total: number;
            page: number;
            nextPage: number | null
            limit: number;
        }
    ) {

        c.status(statusCode);
        return c.json({ data, message, pagination });
    }

    errorResponse(
        c: Context,
        statusCode: StatusCode = 500,
        message = 'Internal server error',
        meta?: {
            error?: string;
            data?: any;
        },
    ) {
        console.log('Error:', statusCode);
        c.status(statusCode);
        return c.json({ ...meta, message });
    }
}