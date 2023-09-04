import * as tls from "tls";
import { booleanToShortString } from "./booleanToShortStringTransform";
import { booleanToNumber } from "./booleanToNumberTransform.helper";

export const getDataAccumulater = (
  data,
  type: "string" | "number" = "string"
): string => {
  let dataAccumulater = "";
  for (const param in data) {
    if (typeof data[param] === "boolean") {
      if (type === "string") {
        dataAccumulater += `${param} = '${booleanToShortString(
          data[param]
        )}', `;
      } else {
        dataAccumulater += `${param} = '${booleanToNumber(data[param])}', `;
      }
    } else if (data[param] && param !== "id") {
      dataAccumulater += `${param} = '${data[param]}', `;
    }
  }
  return dataAccumulater.slice(0, -2);
};
