import React from "react"
import { cn } from "../../utils/cn"

const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
      outline:
        "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md",
      gradient:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-sm hover:shadow-md",
    }

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg",
    }

    const classes = cn(baseClasses, variants[variant], sizes[size], loading && "cursor-wait", className)

    if (asChild) {
      return React.cloneElement(children, {
        className: classes,
        ref,
        ...props,
      })
    }

    return (
      <button className={classes} ref={ref} disabled={disabled || loading} {...props}>
        {loading && <div className="spinner mr-2" />}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
