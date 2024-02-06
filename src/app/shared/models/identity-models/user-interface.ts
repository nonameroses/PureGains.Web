export interface User {
    auth0UserId: string,
    email : string;
    givenName: string;
    familyName: string;
    nickname: string;
    createdAt: Date;
    isProfileCreated: boolean;
}