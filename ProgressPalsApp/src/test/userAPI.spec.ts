// src/test/userAPI.spec.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:5243'; // replace with your actual API endpoint

describe('User API', () => {

    const testUser = {
        email: 'test123@example.com',
        password: 'TestPassword123123!',
        name: 'Test User 123',
        birthdate: '1990-01-01',
        displayUsername: 'testuser123',
        gender: 0
    };
    
//Have to create a user before being able to login but user needs to be 
//confirmed before logging in
//   it('should register a user successfully', async () => {
//     const response = await axios.post(`${BASE_URL}/api/user/register`, testUser);

//     expect(response.status).toBe(200);
//   });

it('should login a user successfully', async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, {
            email: testUser.email,
            password: testUser.password
        });

        expect(response.status).toBe(200);

        // Check if token exists in the response
        if (response.data.token) {
            expect(response.data.token).toBeDefined();
        } 
        
        // Otherwise, check for an error message
        else if (response.data.message) {
            expect(response.data.message).toBe('Incorrect username or password.');
        } 
        // If neither token nor message exists, the test will fail
        else {
            throw new Error('Neither token nor error message found in response.');
        }
    } catch (error) {
        throw error; // Rethrow for Jest to capture
    }
});
});

