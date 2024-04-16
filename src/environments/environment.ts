// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import config from '../../auth_config.json';

const { domain, clientId, authorizationParams: { audience }, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
  },
  apiUri: string;
  errorPath: string;
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience === 'https://puregains.com' ? { audience } : null),
      redirect_uri: "https://puregainsclient.azurewebsites.net/callback",
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [
      {
        // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
        uri: 'https://puregainsapi.azurewebsites.net/*',
      
      }
    ]

 

  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
