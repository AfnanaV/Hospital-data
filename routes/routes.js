const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const dataFilePath = path.join('${__dirname}','..','hospitalData.json');


// Read data from the JSON file
function readData() {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
}

const hospitals = readData();


// GET METHOD
router.get('/', (req, res) => {
  res.send(hospitals);
});

// POST METHOD
router.post('/add', (req, res) => {
  hospitals.push(req.body);
  saveData(hospitals);
  res.json({ message: 'Data posted', data: hospitals });
});

// UPDATE METHOD
router.put('/update/:hospitalName', (req, res) => {
  const hospitalName = req.params.hospitalName;
  const updatedHospital = req.body;
  const index = hospitals.findIndex((hospital) => hospital.name === hospitalName);

  if (index !== -1) {
    hospitals[index] = updatedHospital;
    saveData(hospitals);
    res.json({ message: 'Data updated', data: hospitals });
  } else {
    res.status(404).send('Hospital not found');
  }
});

// DELETE METHOD
router.delete('/remove/:hospitalName', (req, res) => {
  const hospitalName = req.params.hospitalName;
  const index = hospitals.findIndex((hospital) => hospital.name === hospitalName);

  if (index !== -1) {
    hospitals.splice(index, 1);
    saveData(hospitals);
    res.json({ message: 'Data deleted', data: hospitals });
  } else {
    res.status(404).send('Hospital not found');
  }
});

// Save data to the JSON file
function saveData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath, jsonData);
}

module.exports = router;
