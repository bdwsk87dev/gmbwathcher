export declare class gmbController {
    start(): Promise<void>;
    getLocations(oAuth2Client: any): Promise<void>;
    authurl(): Promise<any>;
    authorize(credentials: any, callback: any): Promise<void>;
    getNewToken(oAuth2Client: any, callback: any): void;
}
