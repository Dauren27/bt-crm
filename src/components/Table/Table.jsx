import React from "react";
import propertySlice from "../../features/property/propertySlice";
import "./Table.scss";

const Table = ({ children, ...props }) => {
  return (
    <div className="table__container">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
