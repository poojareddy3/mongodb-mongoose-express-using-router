//takes me to what we need to look at
const { Router} = require('express');
const controllers = require('../controllers');
const router = Router();

//creating router to get data
router.get('/', (req, res) => {
    res.send("This is the root!");
})

//router to create data
router.post('/plants', controllers.createPlant) 

router.get('/plants', controllers.getAllPlants)

router.get('/plants/:id', controllers.getPlantById)

router.put('/plants/:id', controllers.updatePlant);

router.delete('/plants/:id', controllers.deletePlant);

module.exports = router;