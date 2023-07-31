// testAPI.spec.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5243';  // Adjust to your API's URL

describe('API Endpoints', () => {
  it('hits the /Test endpoint successfully', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Test`);
      
      // Expect the response to be successful and contain "test works"
      expect(response.status).toBe(200);
      expect(response.data).toBe('Test works');
      
    } catch (error) {
      throw error;
    }
  });
});
