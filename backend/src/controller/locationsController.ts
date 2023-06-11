import { resultOk, resultError } from '../middleware/resultHandler';
import {locationsRepository} from "../repository";
import {Router} from "express";
import {validation} from "../middleware/validation";
import { LocationCreateSchema } from "../models";

const locationsRouter = Router();

locationsRouter.get("/", async (req, res) => {
    const location = await locationsRepository.getAll();
    if (location!.isErr) {
        return resultError(500, res, location.error.message);
    }
    return resultOk(location.value, res, `Listed ${location.value.length} locations`)
})

locationsRouter.post("/", validation({body: LocationCreateSchema}), async (req, res) => {
    const location = await locationsRepository.createSingle(
        { ...req.body});
    if (location.isErr) {
        return resultError(500, res, location.error.message);
    }
    return resultOk(location.value, res,`Created room with id: ${location.value?.id}`);
});

export default locationsRouter;