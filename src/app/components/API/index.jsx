// export const url = "https://188.42.97.42:8001";
//export const url = "https://tandav-api.ibee.ai";
export const url = "https://rvr-api.ibee.ai";

export const headers = {
  headers: {
    accept: "application/json",
  },
};

export const formHeaders = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    accept: "application/json",
  },
};

export const authHeaders = (token) => {
  return {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};
