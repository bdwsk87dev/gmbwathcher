"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gmbController = void 0;
const common_1 = require("@nestjs/common");
const fs = require('fs');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const readline = require('readline');
const { google } = require('googleapis');
const TOKEN_PATH = appDir + '/../../conf/token.json';
const CREDENTIALS_FILE = appDir + '/../../conf/credentials.json';
const scopes = [
    'https://www.googleapis.com/auth/plus.business.manage',
    'https://www.googleapis.com/auth/cloud-platform'
];
let gmbController = class gmbController {
    async accountList() {
        const readfile = fs.readFile('./conf/credentials.json', (err, content) => {
            if (err)
                return console.log('Error loading client secret file:', err);
            this.authorize(JSON.parse(content), this.gedAdminList);
        });
    }
    async gedAdminList(oAuth2Client) {
        google.options({ auth: oAuth2Client });
        const mybusinessaccountmanagement = google.mybusinessaccountmanagement('v1');
        const ress = await mybusinessaccountmanagement.accounts.list({});
        console.log(ress.data);
        const accountId = ress.data.accounts[0].name;
        const mybusinessbusinessinformation = google.mybusinessbusinessinformation('v1');
        const apiKey = "AIzaSyDl4INBe0C2FQSMcR9J-BsgPH-3_DeBGxg";
        const result = await mybusinessbusinessinformation.accounts.locations.list({
            parent: accountId,
            readMask: 'name',
            pageSize: '2',
            key: apiKey,
        });
        console.log(result.data);
    }
    async authurl() {
        const oauth2Client = new google.auth.OAuth2('348647607684-b0fspa0gcd7a5falk1ipkpcbnnvl0e8f.apps.googleusercontent.com', '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', 'http://localhost:5000/gmb/locations');
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
        console.log(url);
        return url;
    }
    async auth() {
        fs.readFile('./conf/credentials.json', (err, content) => {
            if (err)
                return console.log('Error loading client secret file:', err);
            this.authorize(JSON.parse(content), this.listConnectionNames);
        });
    }
    async listConnectionNames(oAuth2Client) {
        const auth = new google.auth.GoogleAuth({
            scopes: scopes,
        });
        const authClient = await auth.getClient();
        google.options({ auth: authClient });
        const mybusinessaccountmanagement = google.mybusinessaccountmanagement('v1');
        const ress = await mybusinessaccountmanagement.accounts.list({});
        console.log(ress.data);
    }
    async authorize(credentials, callback) {
        const { client_secret, client_id, redirect_uris } = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        fs.readFile('./conf/token.json', (err, token) => {
            if (err)
                return this.getNewToken(oAuth2Client, callback);
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
                if (err)
                    return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                fs.writeFile('./conf/token.json', JSON.stringify(token), (err) => {
                    if (err)
                        return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }
};
__decorate([
    (0, common_1.Get)('/accountList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], gmbController.prototype, "accountList", null);
__decorate([
    (0, common_1.Get)('/authurl'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], gmbController.prototype, "authurl", null);
__decorate([
    (0, common_1.Get)('/auth'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], gmbController.prototype, "auth", null);
gmbController = __decorate([
    (0, common_1.Controller)('/gmb')
], gmbController);
exports.gmbController = gmbController;
//# sourceMappingURL=gmb.controller.js.map