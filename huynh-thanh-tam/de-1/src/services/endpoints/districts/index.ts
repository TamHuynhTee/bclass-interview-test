import data from "@data/quan_huyen.json";
import { IDistrict, IOption } from "@interfaces/index";

export const getDistricts = async (provinceId: string): Promise<IOption[]> => {
  const rawData = Object.values(data)
    .filter((item) => item.parent_code === provinceId)
    .map((item) => ({
      label: item.name_with_type,
      value: item.code,
    }));

  return rawData;
};

export const getDistrictById = (districtId: string): IDistrict | null => {
  if (districtId in data) return data[districtId as keyof typeof data];

  return null;
};
