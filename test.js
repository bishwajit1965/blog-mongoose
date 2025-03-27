const data =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, adipisci harum? Rerum, expedita cum consequatur, enim earum officia nobis quo rem adipisci magni commodi temporibus minima quibusdam. Commodi, corporis placeat..Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, adipisci harum? Rerum, expedita cum consequatur, enim earum officia nobis quo rem adipisci magni commodi temporibus minima quibusdam. Commodi, corporis placeat..Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, adipisci harum? Rerum, expedita cum consequatur, enim earum officia nobis quo rem adipisci magni commodi temporibus minima quibusdam. Commodi, corporis placeat.";

const generateExcerpt = (content, maxLength = 250) => {
  if (!content) return ""; // Return empty if no content is provided

  // If content length is less than or equal to maxLength, return it with "..."
  if (content.length <= maxLength) {
    return content.trim() + "..."; // Add ellipsis if it's short enough
  }

  // Truncate the content to the specified maxLength
  let excerpt = content.substring(0, maxLength);

  // Look for the last period within the last 40 characters of the excerpt
  const lastPeriodIndex = excerpt.lastIndexOf(".");

  // If a period is found within the last 40 characters, cut the excerpt at the period
  if (lastPeriodIndex !== -1 && lastPeriodIndex > maxLength - 40) {
    excerpt = excerpt.substring(0, lastPeriodIndex + 1) + "..."; // Add ellipsis after the period
  } else {
    // If no period is found within the acceptable range, just truncate and add "..."
    excerpt = excerpt.substring(0, maxLength - 3) + "..."; // Add ellipsis at the end of the truncated string
  }
  return excerpt;
};

generateExcerpt(data, 250);
