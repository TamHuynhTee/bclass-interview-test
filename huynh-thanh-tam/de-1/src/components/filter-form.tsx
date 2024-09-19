import { AREA_RANGES, PRICE_RANGES } from "@constants/index";
import React, { useEffect, useState } from "react";
import { getProvinces, getDistricts } from "@services/endpoints";
import { IOption } from "@interfaces/index";
import { useFilterContext } from "@context/list-article";

const ProvinceSelect = ({ setProvinceId }: { setProvinceId: any }) => {
  const [provinces, setProvinces] = useState<IOption[]>([]);

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  return (
    <div className="col-md-2">
      <label className="form-label">Tỉnh thành</label>
      <select
        className="form-select"
        name="city"
        onChange={(e) => setProvinceId(e.target.value)}
      >
        <option value="">--Tỉnh thành--</option>
        {provinces.map((province) => (
          <option key={province.value} value={province.value}>
            {province.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const DistrictSelect = ({ provinceId }: { provinceId: string | null }) => {
  const [districts, setDistricts] = useState<IOption[]>([]);

  useEffect(() => {
    if (provinceId)
      getDistricts(provinceId).then((data) => {
        setDistricts(data);
      });
    else setDistricts([]);
  }, [provinceId]);

  return (
    <div className="col-md-2">
      <label className="form-label">Quận huyện</label>
      <select className="form-select" name="district">
        <option value="">--Quận huyện--</option>
        {districts.map((province) => (
          <option key={province.value} value={province.value}>
            {province.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FilterForm: React.FC = () => {
  const { fetchResults } = useFilterContext();
  const [provinceId, setProvinceId] = useState<string | null>(null);

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetchResults({
      city: formData.get("city"),
      district: formData.get("district"),
      price_range: formData.get("price_range"),
      area_range: formData.get("area_range"),
    });
  };

  return (
    <div className="mt-4">
      <form className="row gx-2 filter" onSubmit={handleFilter}>
        <ProvinceSelect setProvinceId={setProvinceId} />

        {/* <div className="col-md-2">
          <label className="form-label">Quận huyện</label>
          <select className="form-select" name="district">
            <option value="">--Quận huyện--</option>
            <option value="">Quận Ba Đình</option>
            <option value="QuanHaiBaTrung">Quận Hai Bà Trưng</option>
            <option value="QuanHoanKiem">Quận Hoàn Kiếm</option>
          </select>
        </div> */}
        <DistrictSelect provinceId={provinceId} />

        <div className="col-md-2">
          <label className="form-label">Khoảng giá</label>
          <select className="form-select" name="price_range">
            <option value="">Chọn mức giá</option>
            {PRICE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label">Diện tích</label>
          <select className="form-select" name="area_range">
            <option value="">Chọn diện tích</option>
            {AREA_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-warning">
            Lọc tin
          </button>
        </div>
      </form>
    </div>
  );
};
