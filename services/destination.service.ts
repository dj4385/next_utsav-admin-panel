import api from "@/lib/axios.interceptor";

export class DestinationService {
    static async getDestinations() {
        try {
            const res = await api.get('/destination');
            return res;    
        } catch (error) {
            return error;
        }
    }

    static async getDestinationById(id: string) {
        try {
            const res = await api.get(`/destination/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async createDestination(data: any) {
        try {
            const res = await api.post('/destination', data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateDestination(id: string, data: any) {
        try {
            const res = await api.put(`/destination/${id}`, data);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteDestination(id: string) {
        try {
            const res = await api.delete(`/destination/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}

