const express = require("express");
const {check} = require("express-validator");

const httpError = require("../models/http-error");
const {getAllPlaces,getPlaceByPlaceId, getPlaceByUserId, createPlace, updatePlace, deletePlace} = require("../controllers/places-controller");

const router = express.Router();

router.get("/", getAllPlaces);

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlaceByUserId);

router.post(
    "/", 
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 5}),
        check('address').not().isEmpty()
    ], 
    createPlace);

router.patch("/:pid",
[
    check('title').not().isEmpty,
    check('description').isLength({min: 5})
],
updatePlace)

router.delete("/:pid", deletePlace)

module.exports = router;