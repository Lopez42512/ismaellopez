const httpError = require("../models/http-error");
const {validationResult} = require("express-validator")
const {v4: uuidv4} = require("uuid")

const getCoordsForAddress = require("../util/location")

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: "state building",
        description: "famous building",
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 w 34th st, New York, NY 10001',
        creator: 'u1'
    }
]

const getAllPlaces = (req,res,next) => {
    res.json(DUMMY_PLACES);
}

const getPlaceByPlaceId = (req,res,next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    if(!place) {
        return next(httpError('could not find a place for the provided place id', 404));
        
    }
    res.json(place)
}

const getPlaceByUserId = (req,res,next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });
    if(!places || places.length === 0) {
        return next(httpError('could not find a place for the provided user id', 404));
        
    }
    res.json(places);
}

const createPlace = async (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors);
        return next(new httpError("Invalid imputs passed, please check your data.", 422))
    }
    const {title, description, address, creator} = req.body;

    let coordinates;
    // connecting to google map to convert address to lat and lng coordinates
    try {
        coordinates = await getCoordsForAddress(address)
    } catch(err) {
        return next(error);
    }

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json(createPlace);
};

const updatePlace = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors);
        throw new httpError("Invalid imputs passed, please check your data.", 422)
    }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    const updatePlace = { ...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex] = updatePlace;

    res.status(200).json({place: updatePlace});
}

const deletePlace = (req,res,next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new httpError("Couldn't find a place for that id", 404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({place: DUMMY_PLACES});
}

exports.getAllPlaces = getAllPlaces;
exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;