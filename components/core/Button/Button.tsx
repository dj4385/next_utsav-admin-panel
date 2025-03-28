import { IButton } from "@/app/types/components/core/IButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const ButtonComponent = ({
    label,
    type,
    onClick,
    loading,
    icon,
    customClass
}: IButton) => {
    return (
        <Button type={type} onClick={onClick} disabled={loading} className={
            cn(
                "relative flex items-center gap-2",
                customClass
            )
        }>
            {
                loading ? (<Loader2 className="animate-spin h-5 w-5" />) : (
                    icon
                )
            }
            {label}
        </Button>
    )
}

export default ButtonComponent;