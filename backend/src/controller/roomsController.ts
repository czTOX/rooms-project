import { resultOk, resultError } from '../middleware/resultHandler';
import {RoomCreateSchema, OfferPostSchema, OfferCreateSchema} from "../models";
import { validation } from "../middleware/validation";
import {roomsRepository, offersRepository} from "../repository";
import {Router, Request} from "express";

const roomsRouter = Router();

// TODO get /:roomId/offers
// TODO post /:roomId/offers

roomsRouter.get("/:roomId", async (req, res) => {
    const roomId = req.params.roomId
    const room = await roomsRepository.getSingleById(roomId)
    if (room.isErr) {
        return resultError(500, res, room.error.message);
    }
    if (room.value === null) {
        return resultError(404, res, `Room with ID ${roomId} doesn't exist`)
    }
    return resultOk(room.value, res, `Listed room with id ${roomId}`)
});

roomsRouter.get("/", async (req, res) => {
    let args: {[name: string]: string} = {}
    if (req.query.location !== undefined) {
        args.location = req.query.location.toString();
    }
    if (req.query.sort) {
        args.sort = req.query.sort.toString();
    }
    /*if (req.query.guests) {
        args.push({guests: req.query.guests});
    }*/

    const rooms = await roomsRepository.getAll(args);
    if (rooms!.isErr) {
        return resultError(500, res, rooms.error.message);
    }
    return resultOk(rooms.value, res, `Listed ${rooms.value.length} rooms`)
});

roomsRouter.post("/", validation({body: RoomCreateSchema}), async (req, res) => {
    // TODO: auth user and get his ID
    const room = await roomsRepository.createSingle(
        { ...req.body});
    if (room.isErr) {
        return resultError(500, res, room.error.message);
    }
    return resultOk(room.value, res,`Created room with id: ${room.value?.id}`);
});

roomsRouter.get("/:roomId/offers", async (req, res) => {
    const roomId = req.params.roomId
    const room = await roomsRepository.getSingleById(roomId, true)
    if (room.isErr) {
        return resultError(500, res, room.error.message);
    }
    if (room.value === null) {
        return resultError(404, res, `Room with ID ${roomId} doesn't exist`)
    }
    return resultOk(room.value, res, `Listed room with id ${roomId}`)
});

roomsRouter.post("/:roomId/offers", validation({body: OfferPostSchema}), async (req:Request, res) => {
    // TODO AUTH and check if user is owner of room
    const roomId = req.params.roomId
    let data = req.body;
    data.roomId = roomId;
    const offer = await offersRepository.createSingle(
        { ...data});
    if (offer.isErr) {
        return resultError(500, res, offer.error.message);
    }
    return resultOk(offer.value, res,`Created offer for room. Offer id is: ${offer.value?.id}`);
});

export default roomsRouter;
