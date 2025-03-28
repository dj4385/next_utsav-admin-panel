import { IAddLandingPageRequest } from "@/app/types/api/request/home.request";
import api from "@/lib/axios.interceptor"

export class AboutService {

    static async getAboutPage () {
        try {
            const res = await api.get(`/about/about-page`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addAboutPage (req: IAddLandingPageRequest) {
        try {
            const res = await api.post(`/about/about-page`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateAboutPage (id: string, req: IAddLandingPageRequest) {
        try {
            const res = await api.put(`/about/about/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteAboutPage (id: string) {
        try {
            const res = await api.delete(`/about/about/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}