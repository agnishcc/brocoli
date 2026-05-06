import { IOrganizationService } from "./types";

export class OrganizationService implements IOrganizationService {
    async test(): Promise<string> {
        return 'test';
    }
}