import api from "@/lib/axios.interceptor";

export class LocationService {
  static async getLocationList(id: string) {
    try {
      const res = await api.get(`destination/location/by-state/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async getAllLocationsList() {
    try {
      const res = await api.get(`destination/location-list`);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async getStateList() {
    try {
      const res = await api.get(`/destination/state-list`);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async addLocation(req: {
    name: string;
    city: string;
    state_id: string;
    state: string;
    address: string;
    image: string;
  }) {
    try {
      const res = await api.post(`/destination/location-list`, req);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async deleteLocation(id: string) {
    try {
      const res = await api.delete(`/destination/location/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  }
}
