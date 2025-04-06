import api from "@/lib/axios.interceptor"

export class LocationService {
    static async getLocationList () {
        try {
            const res = await api.get(`/destination/location-list`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addLocation (req: {name: string, city: string, state: string, address: string, image: string}) {
        try {
            const res = await api.post(`/destination/location-list`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteLocation (id: string) {
        try {
            const res = await api.delete(`/destination/location/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}