import data from "@data/tinh_tp.json";
import { IOption, IProvince } from "@interfaces/index";

export const getProvinces = async (): Promise<IOption[]> => {
  const rawData = Object.values(data).map((item) => ({
    label: item.name_with_type,
    value: item.code,
  }));

  return rawData;
};

export const getProvinceById = (provinceId: string): IProvince | null => {
  if (provinceId in data) return data[provinceId as keyof typeof data];

  return null;
};
