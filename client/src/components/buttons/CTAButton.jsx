import { useNavigate } from "react-router-dom";

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
}) => {
  const navigate = useNavigate();
  // Define base styles
  const baseStyle =
    "px-3 py-1 font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg transform transition-transform duration-300 inline-block lg:block";

  // Define variant-specific styles
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
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 focus:ring-gray-300",
  };

  // Combine all styles
  const combinedClass = `${baseStyle} ${variantStyles[variant]} ${
    (disabled || loading) && "opacity-50 cursor-not-allowed"
  } ${className}`;

  const content = (
    <span className="flex items-center justify-center space-x-2">
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-2 rounded-full animate-spin text-white loading loading-spinner"></span>
      ) : (
        icon && <span>{icon}</span>
      )}
      <span className="text-base-200">{loading ? loadingLabel : label}</span>
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
