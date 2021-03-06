// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  url:"http://localhost:8080",
  url_admins:"http://localhost:8080/api/admins",
  url_users:"http://localhost:8080/api/users",
  url_products:"http://localhost:8080/api/products",
  url_categories:"http://localhost:8080/api/categories",
  url_orders:"http://localhost:8080/api/orders",
  url_clients:"http://localhost:8080/api/clients"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
