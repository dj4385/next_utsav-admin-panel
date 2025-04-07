import api from "@/lib/axios.interceptor"

export class RealWeddingService {

    static async getRealWedding () {
        try {
            const res = await api.get(`/real-wedding`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getRealWeddingDetail (id: string) {
        try {
            const res = await api.get(`/real-wedding/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addRealWedding (req: any) {
        try {
            const res = await api.post(`/real-wedding`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateRealWedding (id: string, req: any) {
        try {
            const res = await api.put(`/real-wedding/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteRealWedding (id: string) {
        try {
            const res = await api.delete(`/real-wedding/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}