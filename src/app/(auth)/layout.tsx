export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="relative z-10 w-full max-w-md p-4">
                {children}
            </div>
        </div>
    )
}
