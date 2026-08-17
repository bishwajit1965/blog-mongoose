import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

const Button = ({
  label = "Click Me",
  onClick,
  variant = "white",
  size = "md",
  icon = null,
  className = "",
  disabled = false,
  loading = false,
  to = null,
  target = "_self",
  rel = "noopener noreferrer",
  loadingLabel = "Loading...",
  href = null,
  type = "button",
  ...props
}) => {
  const navigate = useNavigate();
  const isDisabled = disabled || loading;

  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const sizeStyles = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-400",
    indigo:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-400 rounded-md",
    light:
      "bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-600 hover:to-gray-800 focus:ring-gray-400",
    secondary:
      "bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800 focus:ring-gray-400",
    darkMode:
      "bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-700 focus:ring-slate-400 border dark:border-slate-700",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-400",
    info: "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 focus:ring-cyan-400",
    warning:
      "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-400",
    white:
      "bg-base-100 border border-gray-500 shadow-sm text-gray-700 hover:bg-gray-800 hover:border-gray-400 hover:text-gray-100 focus:ring-gray-300",
    gray: "border border-gray-500 text-gray-700 bg-gray-200 shadow-md focus:ring-gray-400",
    outline:
      "bg-base-100 border border-slate-700 hover:bg-slate-800 hover:text-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 transition-all duration-300 dark:text-gray-400 shadow focus:ring-slate-400 focus:ring-offset-2",
    active:
      "bg-teal-600 border border-emerald-400 text-gray-100 hover:bg-emerald-700 shadow-sm focus:ring-emerald-400",
    refresh:
      "bg-green-500 border border-green-400 text-base-100 hover:bg-green-700 shadow-sm focus:ring-emerald-400",
  };

  const buttonClassName = cn(
    baseStyle,
    sizeStyles[size],
    variantStyles[variant],
    isDisabled && "cursor-not-allowed opacity-50",
    className,
  );

  const content = (
    <span className="flex items-center justify-center gap-2">
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        icon && <span aria-hidden="true">{icon}</span>
      )}
      <span>{loading ? loadingLabel : label}</span>
    </span>
  );

  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (to) {
      event.preventDefault();
      navigate(to);
    }

    if (onClick) {
      onClick(event);
    }
  };

  if (to) {
    return (
      <button
        type={type}
        className={buttonClassName}
        onClick={handleClick}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <a
        href={isDisabled ? undefined : href}
        target={target}
        rel={rel}
        className={buttonClassName}
        aria-disabled={isDisabled}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }

          if (onClick) {
            onClick(event);
          }
        }}
        tabIndex={isDisabled ? -1 : 0}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={handleClick}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
