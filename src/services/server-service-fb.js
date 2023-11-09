const { db } = require('../config/dataBase/firebase');
const {deleteValueInfoFB, updateValue, updateValue_watch, updateWatchByProfessional, ProfessionalsRepository} = require('../repositories/server-fb.repository.js')
const uploadToFirebase = async (data) => {
  try {
    const docRef = await db.collection('notifications').add({
      professional: data.professional,
      message: data.message,
      floor: data.floor,
      tower: data.tower,
      room: data.room,
      messagePriority: data.messagePriority,
      date: new Date(),
      completedWatch: false, 
      completedDesktop: false,
      watch_id:data.watch_id,
    });

    console.log(`Documento creado con ID: ${docRef.id}`);
  } catch (error) {
    console.log('Error al subir a Firebase:', error);
  }
};

const deleteInfoSensor2 = async (id) => {
  try {
      return await deleteValueInfoFB(id);
  } catch (error) {
    console.log(error);
  }
};

const update_desktop = async (id) => {
  try {
      return await updateValue(id);
  } catch (error) {
    console.log(error);
  }
};


const update_watch= async (watch_id) => {
  try {
      return await updateValue_watch(watch_id);
  } catch (error) {
    console.log(error);
  }
};

const update_watch_by_professional= async (watch_id, professional) => {
  try {
      return await updateWatchByProfessional(watch_id, professional);
  } catch (error) {
    console.log(error);
  }
};




const ProfessionalsService = async () => {
  try {
      return await ProfessionalsRepository();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadToFirebase,
  deleteInfoSensor2,
  update_desktop,
  update_watch,
  update_watch_by_professional,
  ProfessionalsService,
};
