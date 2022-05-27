import { Get, Injectable } from "@nestjs/common";
import { LocationsService } from "../locations/locations.service";
import { CreateLocationDto } from "../locations/dto/create-location.dto";
import { ConfigModule } from "@nestjs/config";
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

  constructor(private locationService: LocationsService, private changeService: ChangesService) {
  }

  async startCron() {
    // Prepare credentials
    const readfile = fs.readFile("./conf/credentials.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      this.authorize(JSON.parse(content), this.getLocations, this.locationService, this.changeService);
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

  async authorize(credentials, callback, locationService, changeService) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
    // Check if we have previously stored a token.
    fs.readFile("./conf/token.json", (err, token) => {
      if (err) return this.getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      return callback(oAuth2Client, locationService, changeService);
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

  async getLocations(oAuth2Client, locationService, changeService) {


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
      readMask: "name,languageCode,storeCode,title,phoneNumbers,categories,storefrontAddress,websiteUri,regularHours,specialHours,serviceArea,adWordsLocationExtensions,latlng,openInfo,metadata,profile,relationshipData,moreHours,serviceItems,regularHours",
      pageSize: "2",
      key: apiKey
    });

    let locations = result.data["locations"];
    // console.log(locations);
    for (let key in locations) {
      let locationDto = {
        "name": locations[key]["name"],
        "gmbaccountId": 1, // TODO !!!
        "languageCode": locations[key]["languageCode"],
        "storeCode": locations[key]["storeCode"],
        "title": locations[key]["title"],
        "primaryPhone": locations[key]["phoneNumbers"]["primaryPhone"],
        "additionalPhones": locations[key]["phoneNumbers"]["additionalPhones"] !== null ? locations[key]["phoneNumbers"]["additionalPhones"].join(",") : "",
        "regionCode": locations[key]["storefrontAddress"]["regionCode"],
        "administrativeArea": locations[key]["storefrontAddress"]["administrativeArea"],
        "postalCode": locations[key]["storefrontAddress"]["postalCode"],
        "locality": locations[key]["storefrontAddress"]["locality"],
        "addressLines": locations[key]["storefrontAddress"]["addressLines"] !== null ? locations[key]["storefrontAddress"]["addressLines"].join(",") : "",
        "websiteUri": locations[key]["websiteUrl"],
        "latlng": locations[key]["latlng"] != "undefined" ? JSON.stringify(locations[key]["latlng"]) : "no latlng",
        "mapsUri": locations[key]["metadata"]["mapsUri"],
        "regularHours": locations[key]["regularHours"]["periods"] !== null ? JSON.stringify(locations[key]["regularHours"]["periods"]) : ""
      };

      let location = await locationService.getLocationByName(locations[key]["name"]);
      if (location === null) {
        let location = locationService.createLocation(locationDto);
      } else {
        let updatedLocation = locationService.getLocationByNameAndUpdate(locations[key]["name"], locationDto);
        // Find changes
        for (let cKey in locationDto) {
          console.log(locationDto[cKey] + " => " + location[cKey]);
          if (locationDto[cKey] != location[cKey]) {
            let newChange = {
              "locationId": location.id,
              "name": cKey,
              "value": locationDto[cKey],
              "newVal": location[cKey]
            };
            changeService.createChange(newChange);
          }
        }
      }
    }
  }
}

