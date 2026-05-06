import { Context } from 'hono';
import 'reflect-metadata';
import { Service } from 'typedi';
import { BaseController } from '../../manager/baseController';
import { IOrganizationService } from './types';
import { OrganizationService } from './repo';

@Service()
export class OrganiztionController extends BaseController {
    OrganizationService: IOrganizationService;
    constructor() {
        super();
        this.OrganizationService = new OrganizationService();
    }

    async test(c: Context) {
        try {
            const data = await this.OrganizationService.test();
            return this.jsonResponse(c, data);
        } catch (error) {
            return this.errorResponse(c, 500, 'Internal server error', {});
        }
    }
}