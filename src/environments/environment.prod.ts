export const environment = {
  production: true,
  urlApi: 'https://algamoney-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('financeiro-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
