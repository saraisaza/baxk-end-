
const { db } = require('../config/dataBase/firebase');

const getAllValuesFB = async () => {
  try {
    const snapshot = await db.collection('notifications').get();
    // return snapshot.docs.map((doc) => doc.data());
    const info = snapshot.docs.map((doc) => {return { 
      'id':doc.id,
      'date' : doc.data().date,
      'time' : doc.data().time,
      'room': doc.data().room, 
      'message': doc.data().message,
      'messagePriority': doc.data().messagePriority,
      'tower': doc.data().tower,
      'completedWatch': doc.data().completedWatch,
      'completedDesktop' : doc.data().completedDesktop,
      'professional' : doc.data().professional,
      'floor': doc.data().floor,
      'watch_id': doc.data().watch_id,
      }});
      return info
  } catch (error) {
    console.log(error);
  }
};

const getAllProfessionalsDB = async () => {
  try {
    const snapshot = await db.collection('proffesionals').get();
    const professionals = snapshot.docs.map((doc) => ({
      id: doc.id,
      'function' : doc.data().function,
      'name' : doc.data().name,
      'specialized' : doc.data().specialized,
      'watch_id': doc.data().watch_id,
      
    }));
    return professionals;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getNotificationById = async (watch_id) => {
  try {
    const allNotifications = await getAllValuesFB();
    const filteredNotifications = allNotifications.filter(
      notification => notification.watch_id === watch_id
    );

    const sortedNotifications = filteredNotifications.sort((a, b) => {
      // 
      if (a.messagePriority < b.messagePriority) {
        return -1;
      }
      if (a.messagePriority > b.messagePriority) {
        return 1;
      }

      // 
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }

      // 
      return -1;
    });

    return sortedNotifications[0] || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const getNotificationByProfessional = async (professional) => {
  try {
    const allNotifications = await getAllValuesFB();
    const filteredNotifications = allNotifications.filter(
      notification => notification.professional === professional
    );

    const sortedNotifications = filteredNotifications.sort((a, b) => {
      // 
      if (a.messagePriority < b.messagePriority) {
        return -1;
      }
      if (a.messagePriority > b.messagePriority) {
        return 1;
      }

      // 
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }

      // 
      return -1;
    });

    return sortedNotifications[0] || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteValueInfoFB = async (id) => {
  console.log('Deleting notification with ID', id); 
  try {
    const item = db.collection('notifications').doc(id);
    return item.delete();
  } catch (error) {
    console.log(error);
  }
};

const updateValue= async (id) => {
  const notificationRef = db.collection('notifications').doc(id);

  await notificationRef.update({ completedDesktop: true });

  const updatedNotification = await notificationRef.get();
  return updatedNotification.data();
};

const updateValue_watch = async (watch_id) => {
  const notificationsRef = db.collection('notifications');
  const querySnapshot = await notificationsRef.where('watch_id', '==',watch_id).get();

  if (querySnapshot.empty) {
    throw new Error('No hay ese ID ');
  }

  const notificationDoc = querySnapshot.docs[0];
  const notificationRef = notificationDoc.ref;

  await notificationRef.update({ completed_watch: true });

  const updatedNotificationW = {
    id: notificationDoc.id,
    ...notificationDoc.data()
  };

  return updatedNotificationW;
};

const updateWatchByProfessional = async (message,professional) => {
  try {
    const allNotifications = await getAllProfessionalsDB();
    const filteredNotifications = allNotifications.filter(
      (notification) => {return notification.name === professional}
    );

    const updatedNotifications = [];

    for (const notification of filteredNotifications) {
      const notificationRef = db.collection('proffesionals').doc(notification.id);
      await notificationRef.update({ watch_id: message });

      const updatedNotification = await notificationRef.get();
      updatedNotifications.push({
        id: updatedNotification.id,
        ...updatedNotification.data()
      });
    }

    return updatedNotifications;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const ProfessionalsRepository = async () => {
  try {
    const querySnapshot = await db.collection('proffesionals').get();
    const names = querySnapshot.docs.map((doc) => {return {'name':doc.data().name, 'id': doc.data().watch_id}});
    return names;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    throw error;
  }
};

module.exports = ProfessionalsRepository;


module.exports = {
  getAllValuesFB,
  getNotificationByProfessional,
  deleteValueInfoFB,
  updateValue,
  updateValue_watch,
  getNotificationById,
  updateWatchByProfessional,
  ProfessionalsRepository,
  
};
