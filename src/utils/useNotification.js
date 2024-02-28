/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging, { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

const isIOS = Platform.OS === 'ios';
const CHANNELID = 'codemasters-notif-channel';
const CHANNELNAME = 'Codemasters Notification';

/**
 * @function @hooks useFirebaseNotification
 */
const useFirebaseNotification = () => {
  const [data, setData] = useState({
    type: '',
    params: '',
  });

  /**
	 * ---------------------------------------------------- *
	 * @function iosInitApp
	 * @summary checking firebase apps & create firebase app
	 * @constant iosCredentials
	 * @summary credentials ios notification
	 * ---------------------------------------------------- *
	 */
  const iosCredentials = {
    clientId: '1045991205387-q108nhj4v7tchbk1oentikt3u9mb7tr3.apps.googleusercontent.com',
    appId: '1:1045991205387:ios:8c117f6f4172c309bdf50e',
    apiKey: 'AIzaSyAL0Z2KpS_equqQSgbmRne3rkMS6Dxriak',
    messagingSenderId: '1045991205387',
    projectId: 'codemasters-21b11',
  };
  const credentials = Platform.select({
    ios: iosCredentials,
  });
  const config = {
    name: 'MAIN_APP',
  };
  const iosInitApp = async () => {
    if (!firebase.apps.length) {
      await firebase.initializeApp(credentials, config);
    } else {
      firebase.app();
    }
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  };
  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData()?.userInteraction === 1;
    if (isClicked) {
      // Navigate user to another screen
      eventNotification(notification);
    } else {
      // Do something else with push notification
    }
  };

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // Your code to handle notifications in killed state. For example
    console.log('Killed state notification.', remoteMessage);
  });

  /**
	 * ---------------------------------------------------- *
	 * @function onRequestUserPermission
	 * @summary check permission for notification
	 * ---------------------------------------------------- *
	 */
  const onRequestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
			|| authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      onGetFcmToken();
      onNotificationCreateChannel();
    }
  };

  /**
	 * ---------------------------------------------------- *
	 * @function onGetFcmToken
	 * @summary get firebase token and set to local storage
	 * ---------------------------------------------------- *
	 */
  const onGetFcmToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(' fcmToken', fcmToken);
    if (!fcmToken) {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', token);
    }
  };

  /**
	 * ---------------------------------------------------- *
	 * @function onNotificationCreateChannel
	 * @returns for create channel only android
	 * ---------------------------------------------------- *
	 */
  const onNotificationCreateChannel = () => {
    if (!isIOS) {
      PushNotification.createChannel(
        {
          channelId: CHANNELID,
          channelName: CHANNELNAME,
        },
        (created) => console.log('[created] notif', created),
      );
    }
  };

  /**
	 * ---------------------------------------------------- *
	 * @function onRegisterAppWithFCM
	 * @summary register app with fcm for remote notification
	 * ---------------------------------------------------- *
	 */
  const onRegisterAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
  };

  /**
	 * ---------------------------------------------------- *
	 * @function onNotifConfiguration
	 * @summary for configuration local notification
	 * ---------------------------------------------------- *
	 */
  const onNotifConfiguration = () => {
    const notifConfiguration = {
      onNotification(notification) {
        // console.log(' notification 1 notif configure', notification);
        eventNotification(notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    };
    if (!isIOS) {
      // console.log(' notifConfiguration', notifConfiguration);
      notifConfiguration.popInitialNotification = true;
    } else {
      PushNotificationIOS.addEventListener('localNotification', onRemoteNotification);
    }
    PushNotification.configure({
      ...notifConfiguration,
    });
  };

  /**
	 * ---------------------------------------------------- *
	 * @function eventNotification
	 * @summary this function root of all the functionality
	 * ---------------------------------------------------- *
	 */
  const eventNotification = (notification) => {
    // console.log(' notification 2 event notif', notification);
	 // eslint-disable-next-line no-mixed-spaces-and-tabs
	 var data = {};
    if (notification.userInteraction) {
      if (notification.action === 'Ya' || notification.action === 'Yes') {
        data = {
          ...notification.data,
          accept_request: true,
          click: 'Ya',
        };
        setData(data);
      } else if (notification.action === 'Tidak' || notification.action === 'No') {
        data = {
          ...notification.data,
          accept_request: false,
          click: 'Tidak',
        };
        setData(data);
      } else {
        data = {
          ...notification.data,
          accept_request: false,
          click: 'Body',
        };
        setData(data);
      }
    } else if (notification.foreground) {
      console.log('triggered', notification);
      onShowLocalNotification(notification);
    } else if (!notification.foreground) {
      // console.log(' background data =========', notification);
      setData({
        ...notification.data,
      });
    }
  };

  /**
	 * ---------------------------------------------------- *
	 * @function onShowLocalNotification
	 * @summary show local notification
	 * ---------------------------------------------------- *
	 */
  const onShowLocalNotification = (notification) => {
    console.log(' notification 3 show local notif', notification);
    if (notification) {
      console.log('masuk konfig');
      let configLocalNotif = {};
      if (isIOS) {
        configLocalNotif = {
          id: parseInt(Math.random() * 1000000000, 2),
          title: notification.title || 'No title',
          message: notification.message || '-',
          data: notification.data,
          userInfo: notification,
          // largeIcon: "ic_notification_large",
          // smallIcon: "ic_notification_small_1",
          // color: Colors.PRIMARY,
        };
      } else {
        configLocalNotif = {
          channelId: CHANNELID,
          title: notification.title || 'No title',
          message: notification.message || '-',
         //  message: notification?.data.body,
          data: notification.data,
          allowWhileIdle: true,
          // actions: '["Ya", "Tidak"]',
          largeIcon: 'ic_launcher_round',
          smallIcon: 'ic_launcher_round',
          // color: Colors.RED_BTN,
        };
      //   configLocalNotif.actions = '["Ya", "Tidak"]';
      }
      console.log('cek konfig', configLocalNotif);
      PushNotification.localNotification(configLocalNotif);
    }
  };

  /**
	 * ---------------------------------------------------- *
	 * @dependency []
	 * @summary initialize for remote and local notification
	 * ---------------------------------------------------- *
	 */
  useEffect(() => {
    if (isIOS) { iosInitApp(); }
    onRegisterAppWithFCM();
    onRequestUserPermission();
    onNotifConfiguration();
  }, []);

  return { data };
};

export default useFirebaseNotification;
