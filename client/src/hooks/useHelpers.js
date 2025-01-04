function hideErrorElements() {
  setTimeout(function () {
    document.getElementById("error-message").classList.add("hidden");
  }, 2500);
}
function hideSuccessElements() {
  setTimeout(function () {
    document.getElementById("success-message").classList.add("hidden");
  }, 2500);
}

function textShortener(string, limit) {
  if (string.length > limit) {
    return string.substring(0, limit) + " ... ";
  } else {
    return string;
  }
}

export { hideErrorElements, hideSuccessElements, textShortener };
