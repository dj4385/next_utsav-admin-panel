import api from "@/lib/axios.interceptor"

export class UploadService {

    static async uploadFile (fd: FormData) {
        try {
            const res = await api.post(`/home/upload`, fd, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return res;
        } catch (error) {
            return error;
        }
    }
}