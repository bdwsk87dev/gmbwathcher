import {Controller, Get, Res, HttpStatus} from "@nestjs/common";

const fs = require('fs');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const readline = require('readline');
const {google} = require('googleapis');

const TOKEN_PATH = appDir + '/../../conf/token.json';
const CREDENTIALS_FILE = appDir + '/../../conf/credentials.json';

// Scopes
const scopes = [
  'https://www.googleapis.com/auth/plus.business.manage',
  'https://www.googleapis.com/auth/cloud-platform'
];


@Controller('/gmb')
export class gmbController {

  @Get('/start')
  async start(){
    // Prepare credentials
    const readfile = fs.readFile('./conf/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      this.authorize(JSON.parse(content), this.getLocations);
    });
  }

  async getLocations(oAuth2Client){

    // Setup
    google.options({auth: oAuth2Client});

          //const mybusinessaccountmanagement = google.mybusinessaccountmanagement('v1');
          //const ress = await mybusinessaccountmanagement.accounts.list({
          //});
          //console.log(ress.data);

          // Get locations list
          // const accountId = ress.data.accounts[2].name

    // Hardcode location ID
    let accountId = 'accounts/112414412945354813426'
    // Setup
    const mybusinessbusinessinformation = google.mybusinessbusinessinformation('v1');
    // Get api key from env
    const apiKey = process.env.API_KEY;
    // Get locations
    const result = await mybusinessbusinessinformation.accounts.locations.list({
      parent: accountId,
      readMask: 'name,languageCode,storeCode,title,phoneNumbers,categories,storefrontAddress,websiteUri,regularHours,specialHours,serviceArea,adWordsLocationExtensions,latlng,openInfo,metadata,profile,relationshipData,moreHours,serviceItems',
      pageSize: '2',
      key: apiKey,
    });

    // Foreach result
    let locations = result.data['locations'];


    for (var key in locations) {
      console.log('key => ' + key)

      // Data
      let name = locations[key]['name'];
      let languageCode = locations[key]['languageCode'];
      let storeCode = locations[key]['storeCode'];
      let title = locations[key]['title'];
      let primaryPhone = locations[key]['phoneNumbers']['primaryPhone'];
      let additionalPhones = locations[key]['phoneNumbers']['additionalPhones'].join(',');
      let regionCode = locations[key]['storefrontAddress']['regionCode'];
      let administrativeArea = locations[key]['storefrontAddress']['administrativeArea'];
      let postalCode = locations[key]['storefrontAddress']['postalCode'];
      let locality = locations[key]['storefrontAddress']['locality'];
      let addressLines = locations[key]['storefrontAddress']['addressLines'].join(',');
      let websiteUri = locations[key]['websiteUrl'];
      let latlng = locations[key]['latlng'];
      let mapsUri = locations[key]['metadata']['mapsUri'];



    }

    // console.log(result.data[0].storefrontAddress);
  }

  @Get('/authurl')
  async authurl(){
    const oauth2Client = new google.auth.OAuth2(
      '348647607684-b0fspa0gcd7a5falk1ipkpcbnnvl0e8f.apps.googleusercontent.com',
      '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',
      'http://localhost:5000/gmb/locations',
    );
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      // If you only need one scope you can pass it as a string
      scope: scopes
    });
    console.log(url);
    return url;
  }

  async authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
    // Check if we have previously stored a token.
    fs.readFile('./conf/token.json', (err, token) => {
      if (err) return this.getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      return callback(oAuth2Client);
    });
  }

  getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile('./conf/token.json', JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
}

//
// @Get('/accountList')
// async accountList(){
//   const readfile = fs.readFile('./conf/credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     this.authorize(JSON.parse(content), this.gedAdminList);
//   });
// }
//
// async gedAdminList(oAuth2Client){
//
//   // 1
//   google.options({auth: oAuth2Client});
//   const mybusinessaccountmanagement = google.mybusinessaccountmanagement('v1');
//   const ress = await mybusinessaccountmanagement.accounts.list({
//   });
//
//   console.log(ress.data);
//
//   // 2
//   const accountId = ress.data.accounts[0].name
//   //const accountId = 'accounts/101379913627256269047'
//   const mybusinessbusinessinformation = google.mybusinessbusinessinformation('v1');
//
//   const apiKey = "AIzaSyDl4INBe0C2FQSMcR9J-BsgPH-3_DeBGxg";
//   const result = await mybusinessbusinessinformation.accounts.locations.list({
//     // Required. The name of the account to fetch locations from. If the parent Account is of AccountType PERSONAL, only Locations that are directly owned by the Account are returned, otherwise it will return all accessible locations from the Account, either directly or indirectly.
//     parent: accountId,
//     // Required. Read mask to specify what fields will be returned in the response.
//     readMask: 'name',
//     pageSize: '2',
//     key: apiKey,
//   });
//   console.log(result.data);
// }



// async listConnectionNames(oAuth2Client) {
//   const auth = new google.auth.GoogleAuth({
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//     scopes: scopes,
//   });
//   // Acquire an auth client, and bind it to all future calls
//   const authClient = await auth.getClient();
//   google.options({auth: authClient});
//   const mybusinessaccountmanagement = google.mybusinessaccountmanagement('v1');
//   const ress = await mybusinessaccountmanagement.accounts.list({
//   });
//   console.log(ress.data);
// }

//
// @Get('/auth')
// async auth(){
//   // Load client secrets from a local file.
//   fs.readFile('./conf/credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Tasks API.
//     this.authorize(JSON.parse(content), this.listConnectionNames);
//   });
// }
