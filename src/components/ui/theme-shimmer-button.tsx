import React, { ComponentPropsWithoutRef } from "react"
import { ShimmerButton } from "./shimmer-button"
import { cn } from "@/lib/utils"

export interface ThemeShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  className?: string
  children?: React.ReactNode
}

export const ThemeShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ThemeShimmerButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <>
      {/* Light theme button */}
      <div className="block dark:hidden">
        <ShimmerButton
          ref={ref}
          className={cn(
            "group w-full text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-between text-white transition-all duration-500 ease-out hover:shadow-lg hover:shadow-black/20 transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0",
            className
          )}
          background="rgba(0, 0, 0, 1)"
          shimmerColor="#ffffff"
          {...props}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          <div className="relative z-10 w-full flex items-center justify-between">
            {children}
          </div>
        </ShimmerButton>
      </div>
      
      {/* Dark theme button */}
      <div className="hidden dark:block">
        <ShimmerButton
          ref={ref}
          className={cn(
            "group w-full text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-between text-black transition-all duration-500 ease-out hover:shadow-lg hover:shadow-white/20 transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0",
            className
          )}
          background="rgba(255, 255, 255, 1)"
          shimmerColor="#000000"
          {...props}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          <div className="relative z-10 w-full flex items-center justify-between">
            {children}
          </div>
        </ShimmerButton>
      </div>
    </>
  )
})

ThemeShimmerButton.displayName = "ThemeShimmerButton"