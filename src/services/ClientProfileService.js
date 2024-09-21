// src/services/ClientProfileService.js
import { Service } from '/src/services/Service';

export class ClientProfileService extends Service {
    constructor() {
        super('https://localhost:7187'); // Base URL pointing to the backend
    }

    async getAllClients() {
        try {
            const endpoint = '/AllClients';
            const clientProfile = await this.post(endpoint);
            return clientProfile;
        } catch (error) {
            console.error(`Failed to fetch clients`, error);
            throw error;
        }
    }

    async getClientProfile(entityId) {
        try {
            const endpoint = '/ClientProfile';
            const body = { entityId }; // Create a JSON object with the entityId
            const clientProfile = await this.post(endpoint, body);
            return clientProfile;
        } catch (error) {
            console.error(`Failed to fetch client profile for entity ID: ${entityId}`, error);
            throw error;
        }
    }
}
