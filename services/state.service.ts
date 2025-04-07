import api from "@/lib/axios.interceptor"

export class StateService {
    static async getStateList () {
        try {
            const res = await api.get(`/destination/state-list`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addState (req: {name: string, image: string}) {
        try {
            const res = await api.post(`/destination/state-list`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteState (id: string) {
        try {
            const res = await api.delete(`/destination/state/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}