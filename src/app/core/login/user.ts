export class User {
    UserId: number;
    UserName: string;
    // password: string;
    IsAdmin: boolean;
    IsLoggedIn: boolean;
    JwtToken?: string;
}