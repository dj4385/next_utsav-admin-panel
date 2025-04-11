import api from "@/lib/axios.interceptor";

export class FooterService {
    static async getFooter() {
        try {
            const res = await api.get('/home/footer');
            return res;
        } catch (error) {
            return null;
        }
    }

    static async getFooterDetail(id: string) {
        try {
            const res = await api.get(`/home/footer/${id}`);
            return res;
        } catch (error) {
            return null;
        }
    } 

    static async addFooter(data: any) {
        try {
            const res = await api.post('/home/footer', data);
            return res;
        } catch (error) {
            return null;
        }   
    }
    static async updateFooter(id: string, data: any) {
        try {
            const res = await api.put(`/home/footer/${id}`, data);
            return res;
        } catch (error) {
            return null;
        }
    }
    static async deleteFooter(id: string) {
        try {
            const res = await api.delete(`/home/footer/${id}`);
            return res;
        } catch (error) {
            return null;
        }
    }
}
