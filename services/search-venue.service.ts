import api from "@/lib/axios.interceptor";

export class SearchVenueService {
    static async getVenueList () {
        try {
            const res = await api.get(`/venues/venue-page`);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async addVenue (req: {venue_heading: string, venue_subheading: string, venue_image: string}) { 
        try {
            const res = await api.post(`/venues/venue-page`, req);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async deleteVenue (id: string) {
        try {
            const res = await api.delete(`/venues/venue-page/${id}`);
            return res;
        } catch (error) {
            return error;
        }
    } 

    static async updateVenue (id: string, req: {venue_heading: string, venue_subheading: string, venue_image: string}) {
        try {
            const res = await api.put(`/venues/venue-page/${id}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }   
}   
