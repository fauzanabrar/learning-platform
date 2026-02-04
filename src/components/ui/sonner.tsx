"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl group-[.toaster]:px-4 group-[.toaster]:py-3",
          description: "group-[.toast]:text-muted-foreground font-medium",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:!bg-linear-to-br group-[.toaster]:from-emerald-50/95 group-[.toaster]:to-emerald-100/95 dark:group-[.toaster]:from-emerald-950/90 dark:group-[.toaster]:to-emerald-900/90 group-[.toaster]:!text-emerald-900 dark:group-[.toaster]:!text-emerald-50 group-[.toaster]:!border-emerald-200/50 dark:group-[.toaster]:!border-emerald-800/50 [&>svg]:!text-emerald-600 dark:[&>svg]:!text-emerald-400 group-[.toaster]:border-l-4 group-[.toaster]:border-l-emerald-500 backdrop-blur-md shadow-emerald-500/10",
          error:
            "group-[.toaster]:!bg-linear-to-br group-[.toaster]:from-red-50/95 group-[.toaster]:to-red-100/95 dark:group-[.toaster]:from-red-950/90 dark:group-[.toaster]:to-red-900/90 group-[.toaster]:!text-red-900 dark:group-[.toaster]:!text-red-50 group-[.toaster]:!border-red-200/50 dark:group-[.toaster]:!border-red-800/50 [&>svg]:!text-red-600 dark:[&>svg]:!text-red-400 group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-500 backdrop-blur-md shadow-red-500/10",
          warning:
            "group-[.toaster]:!bg-linear-to-br group-[.toaster]:from-amber-50/95 group-[.toaster]:to-amber-100/95 dark:group-[.toaster]:from-amber-950/90 dark:group-[.toaster]:to-amber-900/90 group-[.toaster]:!text-amber-900 dark:group-[.toaster]:!text-amber-50 group-[.toaster]:!border-amber-200/50 dark:group-[.toaster]:!border-amber-800/50 [&>svg]:!text-amber-600 dark:[&>svg]:!text-amber-400 group-[.toaster]:border-l-4 group-[.toaster]:border-l-amber-500 backdrop-blur-md shadow-amber-500/10",
          info: "group-[.toaster]:!bg-linear-to-br group-[.toaster]:from-blue-50/95 group-[.toaster]:to-blue-100/95 dark:group-[.toaster]:from-blue-950/90 dark:group-[.toaster]:to-blue-900/90 group-[.toaster]:!text-blue-900 dark:group-[.toaster]:!text-blue-50 group-[.toaster]:!border-blue-200/50 dark:group-[.toaster]:!border-blue-800/50 [&>svg]:!text-blue-600 dark:[&>svg]:!text-blue-400 group-[.toaster]:border-l-4 group-[.toaster]:border-l-blue-500 backdrop-blur-md shadow-blue-500/10",
        },
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
