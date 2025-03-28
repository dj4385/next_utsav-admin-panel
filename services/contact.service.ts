import { IContactRequest } from "@/app/types/api/request/contact.request";
import api from "@/lib/axios.interceptor"

export class ContactService {
    
    static async add (req: IContactRequest) {
        try {
            const res = await api.post(`/contact/contact-page`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getContactPageDetail () {
        try {
            const res = await api.get(`/contact/contact-page`);
            return res;
        } catch (error) {
            return error;
        }
    }
}