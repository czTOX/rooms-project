import { resultOk, resultError } from '../middleware/resultHandler';
import {OfferPostSchema,  RoomPostSchema} from "../models";
import { validation } from "../middleware/validation";
import {roomsRepository, offersRepository, usersRepository} from "../repository";
import {Router, Request} from "express";
import {getSingleById} from "../repository/rooms";
import multer from "multer";
import path from "path";

const roomsRouter = Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

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
    if (req.query.startDate) {
        args.startDate = req.query.startDate.toString();
    }
    if (req.query.endDate) {
        args.endDate = req.query.endDate.toString();
    }
    if (req.query.minPrice) {
        args.minPrice = req.query.minPrice.toString();
    }
    if (req.query.maxPrice) {
        args.maxPrice = req.query.maxPrice.toString();
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

roomsRouter.post("/", upload.array("images"), validation({body: RoomPostSchema}), async (req, res) => {
    if(!req.session.user){
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }

    let photosUrls = "";
    if (req.files) {
        // @ts-ignore
        photosUrls = req.files.map((file) => file.filename).join(';');
    }

    const room = await roomsRepository.createSingle(
        { ...req.body, userId: user.value!.id, photosUrls});
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
    if(!req.session.user){
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }

    const roomId = req.params.roomId;
    const room = await getSingleById(roomId);
    if (!room || room.isErr || room.value == null) {
        return resultError(500, res, "Room error exist");
    }

    if (room.value.userId !== user.value?.id) {
        return resultError(500, res, "User is not owner of this room");
    }

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
