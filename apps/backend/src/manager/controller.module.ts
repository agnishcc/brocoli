import 'reflect-metadata';
import { Container } from 'typedi';

import { BaseController } from './baseController';
import { OrganiztionController } from '../modules/organizations/controller';
import { HealthController } from '../modules/health/controller';

export const baseController = Container.get(BaseController);
export const organiztionController = Container.get(OrganiztionController);
export const healthController = Container.get(HealthController);