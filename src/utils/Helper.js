export const capitalizeFirstLetter = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isValidUrl = (url) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  const fileExtensionPattern = /\.(jpg|jpeg|png)$/i;
  return urlPattern.test(url) && fileExtensionPattern.test(url);
};
