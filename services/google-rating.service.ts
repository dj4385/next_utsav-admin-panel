import { IAddAQIRequest } from "@/app/types/api/request/common.request";
import api from "@/lib/axios.interceptor";

export class GoogleRatingService {
    static async getGoogleRating() {
        try {
            const res = await api.get('/api/search/google-rating');
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getGoogleRatingById(id: string) {
        try {
            const res = await api.get(`/api/search/google-rating/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addGoogleRating(req: IAddAQIRequest) {
        try {
            const res = await api.post('/api/search/google-rating', req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateGoogleRating(id: string, req: IAddAQIRequest) {
        try {
            const res = await api.put(`/api/search/google-rating/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteGoogleRating(id: string) {
        try {
            const res = await api.delete(`/api/search/google-rating/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}