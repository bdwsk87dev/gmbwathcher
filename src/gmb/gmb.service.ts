import { Get, Injectable } from "@nestjs/common";
import { LocationsService } from "../locations/locations.service";
import { CreateLocationDto } from "../locations/dto/create-location.dto";
import { ConfigModule } from '@nestjs/config';
import { ChangesService } from "../changes/changes.service";

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
 
@Injectable()
export class GmbService {

  constructor(private locationService: LocationsService, private changeService: ChangesService) {}

  async startCron() {
    // Prepare credentials
    const readfile = fs.readFile("./conf/credentials.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      this.authorize(JSON.parse(content), this.getLocations, this.locationService);
    });
  }

  @Get("/authurl")
  async authurl() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GC_CLIENT_ID,
      process.env.GC_CLIENT_SECRET,
      process.env.GC_REDIRECT_URI
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

  async getLocations(oAuth2Client, locationService) {
    google.options({ auth: oAuth2Client });
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
      pageSize: "10",
      key: apiKey
    });

    let locations = result.data["locations"];
    console.log(locations);
    for (var key in locations) {
      // Find this location in db

      let locationDto = {
        "name": locations[key]["name"] != "undefined" ? locations[key]["name"] : "no name",
        "gmbaccountId": 1,
        "languageCode": locations[key]["languageCode"] != "undefined" ? locations[key]["languageCode"] : "no language code",
        "storeCode": locations[key]["storeCode"] != "undefined" ? locations[key]["storeCode"] : "no store code",
        "title": locations[key]["title"] != "undefined" ? locations[key]["title"] : "no title",
        "primaryPhone": locations[key]["phoneNumbers"]["primaryPhone"] != "undefined" ? locations[key]["phoneNumbers"]["primaryPhone"] : "no primary phone",
        "additionalPhones": locations[key]["phoneNumbers"]["additionalPhones"] != "undefined" ? locations[key]["phoneNumbers"]["additionalPhones"].join(",") : "no additional phones",
        "regionCode": locations[key]["storefrontAddress"]["regionCode"] != "undefined" ? locations[key]["storefrontAddress"]["regionCode"] : "no region code",
        "administrativeArea": locations[key]["storefrontAddress"]["administrativeArea"] != "undefined" ? locations[key]["storefrontAddress"]["administrativeArea"] : "no administrative area",
        "postalCode": locations[key]["storefrontAddress"]["postalCode"] != "undefined" ? locations[key]["storefrontAddress"]["postalCode"] : "no postal code",
        "locality": locations[key]["storefrontAddress"]["locality"] != "undefined" ? locations[key]["storefrontAddress"]["locality"] : "no locality",
        "addressLines": locations[key]["storefrontAddress"]["addressLines"] != "undefined" ? locations[key]["storefrontAddress"]["addressLines"].join(",") : "no address lines",
        "websiteUri": locations[key]["websiteUrl"] != "undefined" ? locations[key]["websiteUrl"] : "no website url",
        "latlng": locations[key]["latlng"] != "undefined" ? JSON.stringify(locations[key]["latlng"]) : "no latlng",
        "mapsUri": locations[key]["metadata"]["mapsUri"] != "undefined" ? locations[key]["metadata"]["mapsUri"] : "no maps uri",
        "regularHours" : locations[key]["regularHours"]["periods"] != "undefined" ? JSON.stringify(locations[key]["regularHours"]["periods"]): "no regular hours"
     };

      locationService.getLocationByName(locations[key]["name"]).then(location => {
          if (location === null) {
            let location = locationService.createLocation(locationDto);
          } else {
            let updatedLocation = locationService.getLocationByNameAndUpdate(locations[key]["name"], locationDto);
            console.log('LOCATION DTO')
            console.log(locationDto);
            console.log('OLD LOCATION')
            console.log(location);
          }
        }
      );

    }
  }
}
