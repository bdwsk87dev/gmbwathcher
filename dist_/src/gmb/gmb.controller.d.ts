export declare class gmbController {
    accountList(): Promise<void>;
    gedAdminList(oAuth2Client: any): Promise<void>;
    authurl(): Promise<any>;
    auth(): Promise<void>;
    listConnectionNames(oAuth2Client: any): Promise<void>;
    authorize(credentials: any, callback: any): Promise<void>;
    getNewToken(oAuth2Client: any, callback: any): void;
}
