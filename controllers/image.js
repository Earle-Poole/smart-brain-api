const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a071956ee8854fe2b62e11dd64ff038c'
  });

var itemFound = 0;

const handleFaceDetectionApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input
    )
    .then(data => {
        if(data){itemFound++};
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleGeneralModelApiCall = (req, res) => {
    app.models.predict(
        Clarifai.GENERAL_MODEL, req.body.input
    )
    .then(data => {
        if(data){itemFound++};
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleFoodDetectionApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FOOD_MODEL, req.body.input
    )
    .then(data => {
        if(data){itemFound++};
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    if(itemFound == 1) {
        db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
        itemFound = 0;
    }
}

module.exports = {
    handleImage,
    handleFaceDetectionApiCall,
    handleGeneralModelApiCall,
    handleFoodDetectionApiCall
};