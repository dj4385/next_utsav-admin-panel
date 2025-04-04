import { IAddAQIRequest } from "@/app/types/api/request/common.request";
import api from "@/lib/axios.interceptor";

export class GoogleRatingService {
    static async getGoogleRating() {
        try {
            const res = await api.get('/search/google-rating');
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getGoogleRatingById(id: string) {
        try {
            const res = await api.get(`/search/google-rating/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addGoogleRating(req: IAddAQIRequest) {
        try {
            const res = await api.post('/search/google-rating', req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateGoogleRating(id: string, req: IAddAQIRequest) {
        try {
            const res = await api.put(`/search/google-rating/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteGoogleRating(id: string) {
        try {
            const res = await api.delete(`/search/google-rating/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}