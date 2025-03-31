import api from "@/lib/axios.interceptor"

export class ExperienceService {
    static async getExperienceList () {
        try {
            const res = await api.get(`/destination/experience-list`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addExperience (req: {name: string}) {
        try {
            const res = await api.post(`/destination/experience-list`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteExperience (id: string) {
        try {
            const res = await api.delete(`/destination/experience/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}