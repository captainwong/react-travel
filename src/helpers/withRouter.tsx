import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface RouteComponentProps {
  navigate: NavigateFunction;
}

export const withRouter = (Component : React.ComponentType<RouteComponentProps | any>) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
  }

  return Wrapper;
}