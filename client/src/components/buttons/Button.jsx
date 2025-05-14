import { useNavigate } from "react-router-dom";

const Button = ({
  label = "Click Me",
  onClick,
  variant = "white",
  icon = null,
  className = "",
  disabled = false,
  loading = false,
  to = null,
  target = "_self",
  rel = "noopener noreferrer",
  loadingLabel = "Loading...",
  href = null,
}) => {
  const navigate = useNavigate();

  const baseStyle =
    "px-4 py-1 font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform duration-300";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-400",
    light:
      "bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-600 hover:to-gray-800 focus:ring-gray-400",
    secondary:
      "bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800 focus:ring-gray-400",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-400",
    info: "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 focus:ring-cyan-400",
    warning:
      "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-400",
    white:
      "bg-white border border-1 border-gray-400 shadow-sm text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 focus:ring-gray-300",

    gray: "border border-1 border-gray-500 text-gray-700 bg-gray-200 rounded-full shadow-md focus:ring-2 focus:ring-offset-2 transition-transform duration-300",

    active:
      "bg-teal-600 border border-1 text-gray-100 hover:bg-emerald-700  border-emerald-400 shadow-sm focus:ring-2 focus:ring-offset-2 transition-transform duration-300",
  };

  const combinedButtonStyles = `${baseStyle} ${variantStyles[variant]}  ${
    (disabled || loading) && "opacity-50 cursor-not-allowed"
  } ${className}`;

  const content = (
    <span className="flex items-center justify-center space-x-2">
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-2 rounded-full animate-spin text-white loading loading-spinner"></span>
      ) : (
        icon && <span>{icon}</span>
      )}
      <span className="text-gray-2000">{loading ? loadingLabel : label}</span>
    </span>
  );

  const handleNavigation = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };
  return to ? (
    <button
      className={combinedButtonStyles}
      onClick={handleNavigation}
      disabled={disabled || loading}
    >
      {content}
    </button>
  ) : href ? (
    <a
      href={href}
      target={target}
      rel={rel}
      className={combinedButtonStyles}
      aria-disabled={disabled || loading}
    >
      {content}
    </a>
  ) : (
    <button
      className={combinedButtonStyles}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};

export default Button;
