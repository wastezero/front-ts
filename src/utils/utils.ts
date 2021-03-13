export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const setKisToken = (val) => {
  document.cookie = "kis_token=" + val + "; path=/; Max-Age=2592000";
};

export const removeKisToken = () => {
  document.cookie = "kis_token=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
};

export const addressToString = (address) => {
  return address.street + " " + address.house_number + ", " + address.city_name;
};
