import { apiClient } from '../client';

export interface LoginPayload {
    email: string;
    password: string;
}


export interface LoginResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        accessToken: string; 
        user: {
            id: string;
            name: string;
            email: string;
            avatarColor?: string;
        };
    };
}

export const loginUser = async (credentials: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};