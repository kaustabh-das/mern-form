require('dotenv/config');
const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
let User = require('../models/user.model');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image');

router.route('/upload').post(upload,(req, res) => {

    //it will so the information of the image in console.
     console.log(req.file);

    let myFile = req.file.originalname.split(".");
    const fileType = myFile[myFile.length - 1];

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }
        console.log("Image added");
        res.status(200).send(data);
    })
})

// This is the 'GET' request. 
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// This is the 'POST' request.
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const height = req.body.height;
  const weight = req.body.weight;
  const gpa = req.body.gpa;
  const award = req.body.award;
  const contact = req.body.contact;
   const score = req.body.score;
  const urlLink = req.body.urlLink;

  const newUser = new User({
      username,
      height,
      weight,
      gpa,
      award,
      contact,
      score,
      urlLink,
    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(users => res.json(users.username))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;