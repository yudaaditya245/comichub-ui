import axios from "axios";

export async function getComics(page = 1, source) {
  const { data } = await axios.get(`/api/get-comics?page=${page}&source=${source}`);
  if (data) return data;
  throw Error("No data");
}

export async function getLatestLists(page) {
  const { data } = await axios.get(`/api/latest-comics?page=${page}`);
  if (data) return data;
  throw Error("No data");
}

export async function getGroupLists() {
  const { data } = await axios.get(`/api/latest-groups`);
  if (data) return data;
  throw Error("No data");
}

export async function getComicDetail(id) {
  const { data } = await axios.get(`/api/get-detail/${id}`);
  if (data) return data;
  throw Error("No data");
}