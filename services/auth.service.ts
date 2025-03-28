import { ILoginRequest, IRegisterRequest } from "@/app/types/api/request/auth.request";
import api from "@/lib/axios.interceptor"

export class AuthService {
    static async register (req: IRegisterRequest) {
        try {
            const res = await api.post(`/auth/register`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async login (req: ILoginRequest) {
        try {
            const res = await api.post(`/auth/login`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getUserDetail () {
        try {
            const res = await api.get(`/auth/me`);
            return res;
        } catch (error) {
            return error;
        }
    }
}