import api from "@/lib/axios.interceptor";

export class DesignService {
    static async getDesignList() {
        try {
            const res = await api.get('/real-wedding/design');
            return res;
        } catch (error) {
            return null;
        }
    }

    static async getDesignDetail(id: string) {
        try {
            const res = await api.get(`/real-wedding/design/${id}`);
            return res;
        } catch (error) {
            return null;
        }
    }

    static async addDesign(data: any) {
        try {
            const res = await api.post('/real-wedding/design', data);
            return res;
        } catch (error) {
            return null;
        }
    }   

    static async updateDesign(id: string, data: any) {
        try {
            const res = await api.put(`/real-wedding/design/${id}`, data);
            return res;
        } catch (error) {
            return null;
        }
    }

    static async deleteDesign(id: string) {
        try {
            const res = await api.delete(`/real-wedding/design/${id}`);
            return res;
        } catch (error) {
            return null;
        }
    }
}

