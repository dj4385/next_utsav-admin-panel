import { IAddAQIRequest, IAddCateringRequest } from "@/app/types/api/request/common.request";
import api from "@/lib/axios.interceptor";

export class CateringService {
    static async getCatering() {
        try {
            const res = await api.get('/search/catering');
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getCateringById(id: string) {
        try {
            const res = await api.get(`/search/catering/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addCatering(req: IAddCateringRequest) {
        try {
            const res = await api.post('/search/catering', req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateCatering(id: string, req: IAddCateringRequest) {
        try {
            const res = await api.put(`/search/catering/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteCatering(id: string) {
        try {
            const res = await api.delete(`/search/catering/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}