const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a071956ee8854fe2b62e11dd64ff038c'
  });

let faceFound = {};
let itemsDetected = {};

const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            faceFound = data.outputs[0].data.regions;
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}

const handleGeneralModelApiCall = (req, res) => {
    app.models.predict(
        Clarifai.GENERAL_MODEL, req.body.input)
        .then(data => {
            itemsDetected = data.outputs[0].data.concepts;
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}

const handleCelebrityDetectionApiCall = (req, res) => {
    app.models.predict(
        Clarifai.CELEBRITY_MODEL, req.body.input)
        .then(data => {
            console.log(data)
            itemsDetected = data.outputs[0].data.concepts;
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    if(faceFound || itemsDetected) {
        db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
        faceFound = {}
        itemsDetected = {}
    }
}

module.exports = {
    handleImage,
    handleApiCall,
    handleGeneralModelApiCall,
    handleCelebrityDetectionApiCall
}