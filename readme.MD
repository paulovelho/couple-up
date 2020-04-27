# couple up

node version: 10.9.0

## commands
`ionic serve` => runs application in localhost (available at http://localhost:8100/)

`ionic cordova resources --icon` => generate icons (based on `resources/icon`)

---

### version update
update version on files `config.xml`.


## web
`ionic cordova platform add browser`
`ionic cordova build browser --prod --release`


## Android

`ionic cordova run android --verbose` => runs application in android emulator
`ionic cordova run android --verbose -l -c -s --debug` => runs application with debugging enabled

### publishing for Android
`keytool -genkey -v -keystore coupleup.keystore -alias coupleup -keyalg RSA -keysize 2048 -validity 10000`

`ionic cordova build android --prod --release --verbose` => build for production

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore coupleup.keystore app-release-unsigned.apk coupleup` => for signing

`zipalign -v 4 app-release-unsigned.apk CoupleUp.apk` => zipping for an apk
`/c/android/sdk/build-tools/28.0.3/zipalign -v 4 app-release-unsigned.apk CoupleUp.apk` => well, my zipalign is here...


### debugging:
open device consoles at `chrome://inspect/#devices`

### android preparation:
set `ANDROID_SDK_ROOT`, such as: 
```
export ANDROID_SDK_ROOT="/c/android/sdk"
# avdmanager, sdkmanager
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
# adb, logcat
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
# emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
```


---

## iOS

There are some changes regarding the iOS distribution.
When developing for iOS, you should use the branch `ios`

any general changes done should then be pulled to `ios` branch (using, for example `git pull origin master` and fixing eventual conflicts)


### publishing for iOS
run: `cordova platform add ios` 
run: `ionic cordova prepare ios`
run: `cordova build ios --device` 
and navigate to `platforms/ios`

, then, open the project (workspace file) on XCode and compile through it.

#### changes in swift code:
file `plugins/CDVUIInAppBrowser.m`:
remove line `[self.view addSubview:self.toolbar];`


#### generating .ipa
Go to 
Product > Destination > Generic IOS Device
Product > Archive
Export the app

