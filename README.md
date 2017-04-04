# cordova-fcm-badge-test

This is a sample project that demonstrates, FCM notification with badge count on app icon. Steps to run this project. Since android does not support badge count on icon, this repo is only to demo, how to make it work for android only. And iOS has inbuilt support for this. So I am skipping that now.

- First setup FCM project in FCM console. Here is the link that has steps to set up. https://firebase.google.com/docs/android/setup
- Then place the google-services.json file at root directory level.
- Then create a request capture url at "https://requestb.in/"  and use that url in www/js/index.js/saveToRemote . This will save token there and we will use that token to send notification for testing the badge set purpose.
- Assuming you have cordova, you need to add android platform using "cordova add platfrom android@4.1.0".
- Then generate APK using "cordova build android".
- Get the APK from platforms\android\build\outputs\apk\android-debug.apk
- Since I have used "https://github.com/leolin310148/ShortcutBadger" , that has limited android support such as htc/sony/samsung/asus/LG etc.., you need to install the APK in one of those mobile.
- On opening app, you will get token in requestb.in website.
- Now, get service key from FCM using this link (http://dev.tapjoy.com/faq/how-to-find-sender-id-and-api-key-for-gcm/).
- There are 3 cases to make it work (the badge count on icon). Anyway notification works for all, but for badge here are the cases.

#1 App in foreground.
- just send the message in request payload, include "badge" in data with required count. It will show directly.

#2 App is background - case -1
- Repeat above step, on opening notification, it will update badge count in app.

#2 App is background - case -2
- Now while sending notification, send only data part not notification part. This way it will directly update badge count. 

As per FCM document(https://firebase.google.com/docs/cloud-messaging/android/receive#sample-receive), when you send notification+data, onMessageReceived will not work if app is in background. FCM will only show notification in system bar, and on tapping notification , onMessageReceived will be called. But when you send only data, onMessageReceived will be called, and that is why badge will updated.

Note: This will work for specific android mobiles. https://github.com/leolin310148/ShortcutBadger#supported-launchers
