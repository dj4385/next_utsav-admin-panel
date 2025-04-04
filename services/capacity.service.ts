import { IAddAQIRequest } from "@/app/types/api/request/common.request";
import api from "@/lib/axios.interceptor";

export class CapacityService {
    static async getCapacity() {
        try {
            const res = await api.get('/search/capacity');
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getCapacityById(id: string) {
        try {
            const res = await api.get(`/search/capacity/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addCapacity(req: IAddAQIRequest) {
        try {
            const res = await api.post('/search/capacity', req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateCapacity(id: string, req: IAddAQIRequest) {
        try {
            const res = await api.put(`/search/capacity/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteCapacity(id: string) {
        try {
            const res = await api.delete(`/search/capacity/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}