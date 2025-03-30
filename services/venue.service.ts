import { IAddVenueRequest } from "@/app/types/api/request/venue.request";
import api from "@/lib/axios.interceptor"

export class VenueService {

    static async getVenues () {
        try {
            const res = await api.get(`/venues`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async getVenueDetail (id: string) {
        try {
            const res = await api.get(`/venues/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addVenue (req: IAddVenueRequest) {
        try {
            const res = await api.post(`/venues`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async updateVenue (id: string, req: IAddVenueRequest) {
        try {
            const res = await api.put(`/venues/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteVenue (id: string) {
        try {
            const res = await api.delete(`/venues/venue/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    }
}