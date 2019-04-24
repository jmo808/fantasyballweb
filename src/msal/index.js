import * as Msal from 'msal'

export default class AuthService {
  constructor () {
    let PROD_REDIRECT_URI = ''
    let redirectUri = window.location.origin
    if (window.location.hostname !== 'localhost') {
      redirectUri = PROD_REDIRECT_URI
    }
    this.applicationConfig = {
      clientID: '5524386e-fbe6-49ee-882a-8164846c40e7',
      authority: 'https://fantasyslopitchapp.b2clogin.com/tfp/fantasyslopitchapp.onmicrosoft.com/B2C_1_SLO',
      graphScopes: ['user.read']
    }
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      this.applicationConfig.authority,
      () => {
        // callback for login redirect
      },
      {
        redirectUri: redirectUri,
        validateAuthority: false,
        // storeAuthStateInCookie: true
        cacheLocation: 'localStorage'
      }
    )
  }
  login () {
    return this.app.loginRedirect().then(
      idToken => {
        const user = this.app.getUser()
        console.log(user)
        return user
      }
    )
  };
  logout () {
    this.app.logout()
  };
  getToken () {
    return this.app.acquireTokenSilent({ authority: this.applicationConfig.authority })
      .then(accessToken => {
        return accessToken
      })
      .catch(error => {
        console.error(error)
        return this.app.acquireTokenPopup({ authority: this.applicationConfig.authority })
          .then(accessToken => {
            return accessToken
          })
          .catch(err => {
            console.error(err)
          })
      })
  }
};
