import { IAddAQIRequest } from "@/app/types/api/request/common.request";
import api from "@/lib/axios.interceptor";

export class AQIService {
    static async getAQI() {
        try {
            const res = await api.get('/search/aqi');
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getAQIById(id: string) {
        try {
            const res = await api.get(`/search/aqi/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addAQI(req: IAddAQIRequest) {
        try {
            const res = await api.post('/search/aqi', req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateAQI(id: string, req: IAddAQIRequest) {
        try {
            const res = await api.put(`/search/aqi/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteAQI(id: string) {
        try {
            const res = await api.delete(`/search/aqi/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}