import {google} from 'googleapis'

require('dotenv').config()

// google app config
const googleConfig = {
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    redirect: 'https://internshalawork.herokuapp.com/auth/success'
}

// scopes use for the application
const defaultScope = [
    'https://www.googleapis.com/auth/calendar.events.readonly',
    'profile',
    'email'
]

// oauth2 client
function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

// generate authentication url
function getConnectionUrl(auth : any) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}


// get auth url
module.exports.urlGoogle = function () {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}

// get oauth2 api
function getOAuth2(auth: any) {
    return google.oauth2({
        auth: auth,
        version: 'v2'
    });
}

module.exports.getGoogleAccountFromCode = async function (code: String, cb : CallableFunction) {
    const auth = createConnection();
    // @ts-ignore
    const { tokens } : any = await auth.getToken(code);
    auth.setCredentials(tokens);
    const user = await getOAuth2(auth);
    user.userinfo.get((err, res : any) => {
        if (err) {
            cb(err);
        } else {
            const userProfile = {
                id: res.data.id,
                accessToken: tokens.access_token,
                name: res.data.name,
                displayPicture: res.data.picture,
                email: res.data.email
            }
            cb(null, userProfile);
        }
    })
}
