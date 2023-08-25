import React from "react";
import { useParams } from "react-router-dom";

type MatchParams = {
  touristRouteId: string;
  other: string;
}

export const DetailPage: React.FC = () => {
  const params = useParams<MatchParams>();
  return (
    <h1>DetailPage: {params.touristRouteId} </h1>
  );
};