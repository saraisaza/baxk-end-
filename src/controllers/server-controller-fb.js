
const { getAllValuesFB, getNotificationByProfessional, getNotificationById} = require('../repositories/server-fb.repository');
const {uploadToFirebase, deleteInfoSensor2, update_desktop, update_watch, update_watch_by_professional, ProfessionalsService} = require ('../services/server-service-fb')
const express = require('express');
const bodyParser = require('body-parser');




const notification = async(req, res) => {
  try {
    const body = req.body;
    console.log(body);
    // Llamar a la función y pasar el objeto JSON como argumento
    await uploadToFirebase(body);
    return res.status(200).json(body);
  } catch (error) {
    console.log(error);
  }
}
const lastNotificationbyID = async (req, res) => {
  try {
    const selectedName = req.query.watch_id;
    const notification = await getNotificationById(selectedName);
    res.json({notification});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const lastNotification = async (req, res) => {
  try {
    const selectedName = req.query.professional;
    const notification = await getNotificationByProfessional(selectedName);
    res.json({notification});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getAllValuesFB();
    res.json({ notifications });
  } catch (error) {
    console.log(error);
  }
};



const updateCompletedController = async (req, res) => {
  try {
    const { id } = req.query;
    const sensor2Info = await update_desktop(id);
    return res.json(sensor2Info);
  } catch (error) {
    console.log(error);
  }
};

const updateCompletedWatchController = async (req, res) => {
  try {
    const { watch_id } = req.query;
    const sensor2Info = await update_watch(watch_id);
    return res.json(sensor2Info);
  } catch (error) {
    console.log(error);
  }
};

const EMPAREJADO = async (req, res) => {
  try {
    const { professional, message } = req.query;
    
    const updatedNotifications = await update_watch_by_professional(message, professional);
    
    res.status(200).json(updatedNotifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};



const deleteRecordSensor2 = async (req, res) => {
  try {
    const { id } = req.query;
    const sensor2Info = await deleteInfoSensor2(id);
    return res.json(sensor2Info);
  } catch (error) {
    console.log(error);
  }
};

const ProfessionalsController = async (req, res) => {
  try {
    const names = await ProfessionalsService(); 
    console.log(names); 
    res.status(200).json(names); // Return the names as a response
  } catch (error) {
    console.log(error); // Handle any errors and return an appropriate response
  }
};


module.exports = {
  notification,
  getAllNotifications,
  lastNotificationbyID,
  lastNotification,
  deleteRecordSensor2,
  updateCompletedController,
  updateCompletedWatchController,
  EMPAREJADO,
  ProfessionalsController,
};
