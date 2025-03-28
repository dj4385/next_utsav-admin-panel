import { IAddLandingPageRequest } from "@/app/types/api/request/home.request";
import api from "@/lib/axios.interceptor"

export class HomeService {

    static async getLandingPage () {
        try {
            const res = await api.get(`/home/landing-page`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addLandingPage (req: IAddLandingPageRequest) {
        try {
            const res = await api.post(`/home/landing-page`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateLandingPage (id: string, req: IAddLandingPageRequest) {
        try {
            const res = await api.put(`/home/landing-page/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getLandingPageDetail (id: string) {
        try {
            const res = await api.get(`/home/landing-page/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}