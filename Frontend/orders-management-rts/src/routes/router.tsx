import { Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import OrdersList from "../Components/OrdersList";
import ViewOrder from "../Components/ViewOrder";
import Whatever from "../Components/Whatever";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<OrdersList />} />
      <Route path={ROUTES.VIEW_ORDER} element={<ViewOrder />} />
      <Route path={ROUTES.WHATEVER} element={<Whatever />} />
    </Routes>
  );
};
export default Router;
