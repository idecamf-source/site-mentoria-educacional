import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    className?: string;
}

export default function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
    return (
        <div className={`flex flex-col items-center justify-center min-h-[50vh] ${className}`}>
            <Loader2 className="h-12 w-12 animate-spin text-secondary" />
            <p className="mt-4 text-muted-foreground font-medium animate-pulse">Carregando...</p>
        </div>
    );
}
