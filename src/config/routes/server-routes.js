const { Router } = require('express');

const router = Router();


const {
    getAllNotifications,
    notification,
    lastNotification,
    deleteRecordSensor2,
    updateCompletedController,
    updateCompletedWatchController,
    lastNotificationbyID,
    EMPAREJADO,
    ProfessionalsController
} = require("../../controllers/server-controller-fb");

const {
    sendEmail
} = require("../../controllers/email-controller.js");

router.get('/notifications', getAllNotifications);
router.post('/notification', notification);
router.get('/lastnotification', lastNotification);
router.get('/lastnotificationbyid', lastNotificationbyID);
router.delete('/delete', deleteRecordSensor2);
router.put('/updatedesktop', updateCompletedController);
router.put('/updatewatch', updateCompletedWatchController);
router.put('/emparejado', EMPAREJADO);
router.get('/employeelist', ProfessionalsController);
router.post('/send-email', sendEmail);

module.exports = router;