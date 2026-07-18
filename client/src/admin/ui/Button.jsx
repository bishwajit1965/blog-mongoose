import { Loader } from "lucide-react";
import { cn } from "../../utils/cn.js";

const Button = ({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  rounded = false,
  loading = false,
  disabled = false,
  tooltip,
  icon: Icon,
  className,
  ...props
}) => {
  const Component = href ? "a" : "button";

  const isDisabled = disabled || loading;

  // BASE
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm border border-base-content/15";

  // SIZE
  const sizes = {
    xs: "h-7 px-2 text-xs",
    sm: "h-8.25 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  // VARIANTS
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    success: "bg-green-600 text-white hover:bg-green-700",

    danger: "bg-red-600 text-white hover:bg-red-700",

    warning: "bg-yellow-500 text-white hover:bg-yellow-600",

    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",

    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",

    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",

    indigo: "bg-indigo-600 text-white hover:bg-indigo-700",

    muted: "bg-gray-100 text-gray-500 hover:bg-gray-200",
  };

  // RADIUS
  const radius = rounded ? "rounded-full" : "rounded-md";

  const loadingSpinner = <Loader size={16} className="animate-spin" />;

  // Alternative Icon

  // const loadingSpinner = (
  //   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  // );

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
  };

  return (
    <Component
      href={href && !isDisabled ? href : undefined}
      onClick={handleClick}
      title={tooltip}
      aria-disabled={isDisabled}
      className={cn(base, sizes[size], variants[variant], radius, className)}
      {...(Component === "button" ? { disabled: isDisabled } : {})}
      {...props}
    >
      {loading ? (
        <>
          {loadingSpinner}
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </>
      )}
      {/* {loading && loadingSpinner}

      {!loading && Icon && <Icon className="w-4 h-4" />}

      {!loading && children} */}
    </Component>
  );
};

export default Button;
