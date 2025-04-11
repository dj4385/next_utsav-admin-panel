import api from "@/lib/axios.interceptor";

export class PhotographerService {
    static async getPhotographerList() {
        try {
            const res = await api.get('/real-wedding/photographers');
            return res;
        } catch (error) {
            return null;
        }
    }

    static async getPhotographerDetail(id: string) {
        try {
            const res = await api.get(`/real-wedding/photographers/${id}`);
            return res;
        } catch (error) {
            return null;
        }
    }

    static async addPhotographer(data: any) {
        try {
            const res = await api.post('/real-wedding/photographers', data);
            return res;
        } catch (error) {
            return null;
        }
    }   

    static async updatePhotographer(id: string, data: any) {
        try {
            const res = await api.put(`/real-wedding/photographers/${id}`, data);
            return res;
        } catch (error) {
            return null;
        }
    }

    static async deletePhotographer(id: string) {
        try {
            const res = await api.delete(`/real-wedding/photographers/${id}`);
            return res;
        } catch (error) {
            return null;
        }
    }
}

