import { Controller, Get, Res, HttpStatus } from "@nestjs/common";
import { LocationsService } from "../locations/locations.service";
import { CreateLocationDto } from "../locations/dto/create-location.dto";

const fs = require("fs");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

const readline = require("readline");
const { google } = require("googleapis");

const TOKEN_PATH = appDir + "/../../conf/token.json";
const CREDENTIALS_FILE = appDir + "/../../conf/credentials.json";


// Scopes
const scopes = [
  "https://www.googleapis.com/auth/plus.business.manage",
  "https://www.googleapis.com/auth/cloud-platform"
];


@Controller("/gmb")
export class gmbController {

  constructor(private locationService: LocationsService) {
  }


  @Get("/start")
  async start() {


    // let locationDto = {
    //   'name': 'no name22',
    //   'gmbaccountId': 1,
    //   'languageCode':'no language code',
    //   'storeCode':'no store code',
    //   'title': 'no title',
    //   'primaryPhone': 'no primary phone',
    //   'additionalPhones':'no additional phones',
    //   'regionCode':'no region code',
    //   'administrativeArea': 'no administrative area',
    //   'postalCode': 'no postal code',
    //   'locality': 'no locality',
    //   'addressLines' :'no address lines',
    //   'websiteUri' :'no website url',
    //   'latlng':'no latlng',
    //   'mapsUri':'no maps uri'
    // };
    // this.locationService.getLocationByNameAndUpdate('no name',locationDto);
    //
    // return 1;


    // Prepare credentials
    const readfile = fs.readFile("./conf/credentials.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      this.authorize(JSON.parse(content), this.getLocations, this.locationService);
    });
  }

  async getLocations(oAuth2Client, locationService) {


    // Setup
    google.options({ auth: oAuth2Client });

    //const mybusinessaccountmanagement = google.mybusinessaccountmanagement('v1');
    //const ress = await mybusinessaccountmanagement.accounts.list({
    //});
    //console.log(ress.data);

    // Get locations list
    // const accountId = ress.data.accounts[2].name

    // Hardcode location ID
    let accountId = "accounts/112414412945354813426";
    // Setup
    const mybusinessbusinessinformation = google.mybusinessbusinessinformation("v1");
    // Get api key from env
    const apiKey = process.env.API_KEY;
    // Get locations
    const result = await mybusinessbusinessinformation.accounts.locations.list({
      parent: accountId,
      readMask: "name,languageCode,storeCode,title,phoneNumbers,categories,storefrontAddress,websiteUri,regularHours,specialHours,serviceArea,adWordsLocationExtensions,latlng,openInfo,metadata,profile,relationshipData,moreHours,serviceItems",
      pageSize: "2",
      key: apiKey
    });

    let locations = result.data["locations"];
    console.log(locations);
    for (var key in locations) {
      // Find this location in db

      let locationDto = {
        "name": locations[key]["name"] ? locations[key]["name"] : "no name",
        "gmbaccountId": 1,
        "languageCode": locations[key]["languageCode"] ? locations[key]["languageCode"] : "no language code",
        "storeCode": locations[key]["storeCode"] ? locations[key]["storeCode"] : "no store code",
        "title": locations[key]["title"] ? locations[key]["title"] : "no title",
        "primaryPhone": locations[key]["phoneNumbers"]["primaryPhone"] ? locations[key]["phoneNumbers"]["primaryPhone"] : "no primary phone",
        "additionalPhones": locations[key]["phoneNumbers"]["additionalPhones"] ? locations[key]["phoneNumbers"]["additionalPhones"].join(",") : "no additional phones",
        "regionCode": locations[key]["storefrontAddress"]["regionCode"] ? locations[key]["storefrontAddress"]["regionCode"] : "no region code",
        "administrativeArea": locations[key]["storefrontAddress"]["administrativeArea"] ? locations[key]["storefrontAddress"]["administrativeArea"] : "no administrative area",
        "postalCode": locations[key]["storefrontAddress"]["postalCode"] ? locations[key]["storefrontAddress"]["postalCode"] : "no postal code",
        "locality": locations[key]["storefrontAddress"]["locality"] ? locations[key]["storefrontAddress"]["locality"] : "no locality",
        "addressLines": locations[key]["storefrontAddress"]["addressLines"] ? locations[key]["storefrontAddress"]["addressLines"].join(",") : "no address lines",
        "websiteUri": locations[key]["websiteUrl"] ? locations[key]["websiteUrl"] : "no website url",
        "latlng": locations[key]["latlng"] ? JSON.stringify(locations[key]["latlng"]) : "no latlng",
        "mapsUri": locations[key]["metadata"]["mapsUri"] ? locations[key]["metadata"]["mapsUri"] : "no maps uri"
      };

      locationService.getLocationByName(locations[key]["name"]).then(location => {
          if (location === null) {
            locationService.createLocation(locationDto);
          } else {
            this.locationService.getLocationByNameAndUpdate("no name", locationDto);
          }
          console.log(location);
        }
      );

      return true;
    }
  }

  @Get("/authurl")
  async authurl() {
    const oauth2Client = new google.auth.OAuth2(
      "348647607684-b0fspa0gcd7a5falk1ipkpcbnnvl0e8f.apps.googleusercontent.com",
      "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",
      "http://localhost:5000/gmb/locations"
    );
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",
      // If you only need one scope you can pass it as a string
      scope: scopes
    });
    console.log(url);
    return url;
  }

  async authorize(credentials, callback, locationService) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
    // Check if we have previously stored a token.
    fs.readFile("./conf/token.json", (err, token) => {
      if (err) return this.getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      return callback(oAuth2Client, locationService);
    });
  }

  getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile("./conf/token.json", JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
}
