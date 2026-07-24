import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

/**
 * A reusable CTA (Call to Action) button or link component.
 *
 * @param {string} label - The text to display on the button/link.
 * @param {function} onClick - The function to call when the button is clicked (ignored for links).
 * @param {string} variant - The style variant of the button ('primary', 'secondary', etc.).
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {boolean} loading - Whether the button is in a loading state.
 * @param {string} loadingLabel - The label to display when loading (optional).
 * @param {JSX.Element} icon - An optional icon to display inside the button.
 * @param {string} className - Additional Tailwind CSS classes for styling.
 * @param {string} href - The URL for the link (renders an <a> tag instead of a <button> if provided).
 * @param {string} target - Specifies where to open the linked document (e.g., "_blank").
 * @param {string} rel - Specifies the relationship between the current document and the linked document.
 * @returns {JSX.Element} The CTA button or link component.
 */
const CTAButton = ({
  label = "Submit",
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  loadingLabel = "Loading...",
  icon = null,
  className = "",
  href = null,
  to = null,
  target = "_self",
  rel = "noopener noreferrer",
  size = "md",
}) => {
  const navigate = useNavigate();
  // Defined base styles
  const baseStyle =
    "px-1.5 pb-0.25 my-1 mx-1 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 inline-flex items-center justify-center gap-2 border shadow-sm";

  // Defined Variant Styles
  const variantStyles = {
    base: "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-900 hover:text-base-100 focus:ring-blue-500",

    primary:
      "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-500",

    secondary:
      "bg-gray-600 text-white border-gray-600 hover:bg-gray-700 focus:ring-gray-500",

    success:
      "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",

    danger:
      "bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-500",

    warning:
      "bg-amber-500 text-white border-amber-500 hover:bg-amber-600 focus:ring-amber-400",

    info: "bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500",

    light:
      "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-300",

    white:
      "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-300",
  };

  const sizeStyles = {
    xs: "h-7 w-content px-1.5 py-1 text-xs",
    sm: "h-9 w-content px-2 py-2 text-sm",
    md: "h-10 w-content px-3 py-3 text-medium",
    lg: "h-12 w-content px-4 py-4 text-lg",
  };

  // Combine all styles
  const combinedClass = cn(
    baseStyle,
    sizeStyles[size],
    variantStyles[variant],
    (disabled || loading) && "opacity-50 cursor-not-allowed",
    className,
  );

  const content = (
    <span className="flex items-center justify-center space-x-1">
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-2 rounded-full animate-spin text-white loading loading-spinner"></span>
      ) : (
        icon && <span>{icon}</span>
      )}
      <span className="">{loading ? loadingLabel : label}</span>
    </span>
  );

  const handleNavigation = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  // Conditionally render <"to"-- it will not reload page> <"a" it will reload page> or <button>
  return to ? (
    <button
      className={combinedClass}
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
      className={combinedClass}
      aria-disabled={disabled || loading}
    >
      {content}
    </a>
  ) : (
    <button
      className={combinedClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};

export default CTAButton;
