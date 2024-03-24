export const getIdFromUrl = (url: string) =>
  url
    .split("/")
    .filter((str) => !Number.isNaN(Number(str)) && str !== "")
    .at(-1) || "";
