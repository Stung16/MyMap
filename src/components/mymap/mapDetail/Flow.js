"use client";
import { ReactFlowProvider } from "reactflow";
import AddNodeOnEdgeDrop from "./AddNodeOnEdgeDrop";

const Flow = ({ dataMap, onUpdateMaps, edge_type,handlesavemap }) => {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop
        dataMap={dataMap}
        onUpdateMaps={onUpdateMaps}
        edge_type={edge_type}
        handlesavemap={handlesavemap}
      />
    </ReactFlowProvider>
  );
};

export default Flow;
