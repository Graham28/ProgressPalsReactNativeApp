// Define types
type User = {
    email: string;
    password: string;
    // Add any other expected properties of a user here
    name?: string;
    birthdate?: string;
    displayUsername?: string;
    gender?: 0 | 1 | 2;
};

// src/api/userAPI.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:5243'; // replace with your API endpoint

export const registerUser = async (user: User) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/register`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}
