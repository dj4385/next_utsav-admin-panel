import { Loader2 } from "lucide-react"

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <p className="text-sm text-gray-600">Loading...</p>
            </div>
        </div>
    )
}

export default FullPageLoader 