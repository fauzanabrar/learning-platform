import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface AuthCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLinkHref: string;
}

export function AuthCard({
    title,
    description,
    children,
    footerText,
    footerLinkText,
    footerLinkHref
}: AuthCardProps) {
    return (
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-card/50 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                <CardDescription className="text-center">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <p className="px-8 text-center text-sm text-muted-foreground w-full">
                    {footerText}{" "}
                    <Link href={footerLinkHref} className="underline underline-offset-4 hover:text-primary">
                        {footerLinkText}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
