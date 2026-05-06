import { Hono } from "hono";
import { healthController, organiztionController } from "../../manager/controller.module";
import { ApiVersion } from "../../../types";
import { HealthController } from "../health/controller";

const organizationRouter = new Hono();


const baseUrlV1 = `/${ApiVersion.v1}/organization`;

const endpoints = {
    test: `${baseUrlV1}/test`,
    alive: `${baseUrlV1}/alive`,
};


// organizationRouter.route("/health", healthRouter);

// organizationRouter.post("/", async (c) => {
//     const body = JSON.parse(await c.req.text())
// });

organizationRouter.get(endpoints.test, async (c) => {
    return await organiztionController.test(c);
});

organizationRouter.get(endpoints.alive, async (c) => {
    return await healthController.aliveCheck(c);
});

export const OrganizationRouter = organizationRouter;