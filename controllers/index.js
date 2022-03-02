//handles CRUD
const res = require('express/lib/response');
const Plant = require('../models/plant');

async function createPlant(req, res) {
try {
    const plant = await new Plant(req.body);//wait until the page loads to create schema and request the data in the body
    await plant.save();
    return res.status(201).json({ plant,})//translating it into json object
} catch (error) {
    return res.status(500).json({error: error.message});
}
}

async function getAllPlants(req, res) {
    try {
        const plants = await Plant.find();
        return res.status(200).json({plants,});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getPlantById(req, res){
    try {
        const {id} = req.params;
        const plant = await Plant.findById(id);
        if(plant){
            return res.status(200).json(plant);
        }
        return res.status(400).send('Plant with specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// async function updatePlant(req, res) {
//     try {
//         const { id } = req.params;
//        await Plant.findByIdAndUpdate(id, req.body, { new: true}, (err, plant) => {
//             if(err){
//                 res.status(500).send(err);
//             }
//             if(!plant){
//                 res.status(500).send('Plant not found');
//             }
//             return res.status(200).json(plant);
//        })
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

const updatePlant =  (req, res) => {
    try {
      const { id } = req.params
     Plant.findByIdAndUpdate(id, req.body, { new: true }, (err, plant) => {
       
        if (err !== null) {
          console.log(err, 'error')
          res.status(404).send(err.message)
        } else {
          console.log(plant)
          res.json(plant)
        }
      })
    } catch (error) {
     return  res.status(500).send(error.message)
    }
  }
  
async function deletePlant(req, res) {
try {
    const { id } = req.params;
    const deleted = await Plant.findByIdAndDelete(id);
    if(deleted){
        return res.status(200).send('Plant deleted')
    }
    throw new Error('Plant not found');
} catch (error) {
    return res.status(500).send(error.message);
}
}
module.exports = {
    createPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant
}

