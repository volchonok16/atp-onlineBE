import { CreateBillOfLandingReportViewModel } from "../models/order.views/billOfLandingView2.model";
import { GoodsInvoiceViewModel } from "../models/order.views/goodsInvoiceView.model.dto";

export type CreateReportDataType =
  | GoodsInvoiceViewModel
  | CreateBillOfLandingReportViewModel;
