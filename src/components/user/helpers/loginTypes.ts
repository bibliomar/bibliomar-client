interface JWTTokenResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
}

export type { JWTTokenResponse };
