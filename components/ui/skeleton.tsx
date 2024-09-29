import { cn } from "@/lib/utils"

function Skeleton({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white flex justify-center items-center", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Skeleton }
