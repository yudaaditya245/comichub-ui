import axios from "axios";

export async function getLatest(page) {
  const { data } = await axios.get(`/apis/latest-comics?page=${page}`);
  if (data) return data;
  throw Error("No data");
}

export async function getGroupLists(group) {
  const { data } = await axios.get(`/apis/get-groups?group=${group}`);
  if (data) return data;
  throw Error("No data");
}

export async function getComicDetail(id) {
  const { data } = await axios.get(`/apis/get-detail/${id}`);
  if (data) return data;
  throw Error("No data");
}