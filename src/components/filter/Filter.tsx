import React from "react";
import { Typography, Divider } from "antd";
import { FilterTag } from "./FilterTag";

const { Text } = Typography;

interface PropsType {
  title: string;
  tags: string[];
}

export const Filter : React.FC<PropsType> = (props) => {
  return (
    <div>
      <Text style={{ marginRight: 40, fontSize: 15, fontWeight: 500 }} >
        {props.title} : {" "}
      </Text>
      {
        props.tags.map((tag, index) => {
          if (index === props.tags.length - 1)
            return <FilterTag key={`fileter${index}`}>{tag}</FilterTag>;
          return (
            <span key={`filter${index}`}>
              <FilterTag>{tag}</FilterTag>
              <Divider type="vertical" />
            </span>
          );
        })
      }
    </div>
  );
}
