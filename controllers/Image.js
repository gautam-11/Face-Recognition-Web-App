
const Clarifai = require('Clarifai');

const app = new Clarifai.App({
	apiKey: 'ef848a574da049eaa8c482b200d10e51'

});
const handleApiCall = (req , res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
	.then(data =>{
		res.json(data);
		})
	.catch(err => res.status(400).json('Not working!!'))	
}
const handleImage = (req , res, db ) =>{

	const { id } = req.body;

	db('users').where('id','=', id)
	.increment('entries' , 1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('unable to get entry count'));
}
module.exports = {

	handleImage : handleImage,
	handleApiCall: handleApiCall
}