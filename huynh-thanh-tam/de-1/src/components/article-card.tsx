import { type IArticle } from "@interfaces/article";
import { FC } from "react";
import { number_to_simple_vietnamese } from "../utils";
import { getDistrictById, getProvinceById } from "@services/endpoints";

type Props = IArticle & {
  price_unit?: string;
};

export const ArticleCard: FC<Props> = (props) => {
  const { price_unit = "tháng" } = props;
  return (
    <div className="article-card">
      <div className="thumbnail">
        <img src={props.thumbnail} alt={props.title} />
      </div>

      <div className="info">
        <p className="title">{props.title}</p>
        <p className="price">
          {number_to_simple_vietnamese(props.price)}/{price_unit}
        </p>
        <div className="metadata">
          <p className="">
            Diện tích:{" "}
            <span className="area">
              {props.area}m<sup>2</sup>
            </span>
          </p>
          <p className="">
            Khu vực:{" "}
            <span className="address">
              {getDistrictById(props.district)?.name_with_type},{" "}
              {getProvinceById(props.city)?.name}
            </span>
          </p>
        </div>
        <p className="content">{props.content}</p>
      </div>
    </div>
  );
};
