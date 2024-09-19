import data from "@data/data.json";
import { IArticle } from "@interfaces/article";

export const getArticles = async (
  filter?: Record<string, string>
): Promise<IArticle[]> => {
  const city = filter?.city;
  const district = filter?.district;
  const price_range = filter?.price_range;
  const area_range = filter?.area_range;

  const result = Object.values(data).filter((item) => {
    if (city && item.city !== city) return false;
    if (district && item.district !== district) return false;
    if (price_range) {
      const [min, max] = price_range.split(",").map(Number);
      if (item.price < min || item.price > max) return false;
    }
    if (area_range) {
      const [min, max] = area_range.split(",").map(Number);
      if (item.area < min || item.area > max) return false;
    }
    return true;
  });

  return result;
};
