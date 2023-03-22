export class Token {
    constructor(
        public jwtToken: string,
        public refreshToken: string
    ){}
}