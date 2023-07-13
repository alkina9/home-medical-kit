// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";


export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBr_kl2CDBoOfG47XAPf9YFPfOlvGMHA8s",
    authDomain: "home-medical-kit-a61be.firebaseapp.com",
    databaseURL: "https://home-medical-kit-a61be-default-rtdb.firebaseio.com",
    projectId: "home-medical-kit-a61be",
    storageBucket: "home-medical-kit-a61be.appspot.com",
    messagingSenderId: "337266778035",
    appId: "1:337266778035:web:0263a9887fa92c1ba3f5c6",
    measurementId: "G-MDR4ZJ4MTH"
  }
};

const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
