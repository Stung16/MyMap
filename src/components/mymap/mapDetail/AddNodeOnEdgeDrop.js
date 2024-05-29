import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";
import CustomEdge from "./TableMap/edges/CustomEdge";
import { generateRandomId } from "@/utils/fn";
import { useDispatch, useSelector } from "react-redux";
const initialNodes = [
  {
    id: "1",
    type: "textUpdater",
    data: { value: "Default Node" },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [];
const edgeTypes = {
  "custom-edge": CustomEdge,
};
// const elk = new ELK();

// const useLayoutedElements = () => {
//   const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
//   const defaultOptions = {
//     "elk.algorithm": "layered",
//     "elk.layered.spacing.nodeNodeBetweenLayers": 100,
//     "elk.spacing.nodeNode": 80,
//   };

//   const getLayoutedElements = useCallback((options) => {
//     const layoutOptions = { ...defaultOptions, ...options };
//     const graph = {
//       id: "root",
//       layoutOptions: layoutOptions,
//       children: getNodes(),
//       edges: getEdges(),
//     };

//     elk.layout(graph).then(({ children }) => {
//       // By mutating the children in-place we saves ourselves from creating a
//       // needless copy of the nodes array.
//       children.forEach((node) => {
//         node.position = { x: node.x, y: node.y };
//       });

//       setNodes(children);
//       window.requestAnimationFrame(() => {
//         fitView();
//       });
//     });
//   }, []);

//   return { getLayoutedElements };
// };
const AddNodeOnEdgeDrop = ({
  dataMap,
  onUpdateMaps,
  edge_type,
  handlesavemap,
}) => {
  const { screenToFlowPosition } = useReactFlow();
  const connectingNodeId = useRef(null);
  const reactFlowWrapper = useRef(null);
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedIdNode, setSelectedIdNode] = useState(null);
  const [selectedIdEdge, setSelectedIdEdge] = useState(null);

  // const { getLayoutedElements } = useLayoutedElements();
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: edge_type };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, edge_type]
  );
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = generateRandomId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { value: `New node` },
          origin: [0.5, 0.0],
          type: "textUpdater",
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
            type: edge_type,
          })
        );
      }
    },
    [screenToFlowPosition, setEdges, setNodes, edge_type]
  );
  const deleteKey = (e) => {
    if (e.key === "Delete" && selectedIdNode && selectedIdNode !== "1") {
      setNodes((nodes) => nodes.filter((node) => node.id !== selectedIdNode));
    }

    if (e.key === "Delete" && selectedIdEdge) {
      setEdges((edges) => edges.filter((edge) => edge.id !== selectedIdEdge));
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", deleteKey);
    return () => {
      document.addEventListener("keyup", deleteKey);
    };
  }, [selectedIdNode, setNodes, selectedIdEdge, setEdges]);
  useEffect(() => {
    setEdges(dataMap?.edges);
    setNodes(dataMap?.nodes);
  }, [dataMap]);
  useEffect(() => {
    onUpdateMaps({
      nodes,
      edges,
    });
  }, [nodes, edges, onUpdateMaps,edge_type]);
  useEffect(() => {
    const newEdges = edges?.map((item) => {
      return { ...item, type: edge_type };
    });
    setEdges(newEdges);
  }, [edge_type]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        // Xử lý sự kiện Ctrl + S ở đây
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt (ví dụ: lưu trang)
        handlesavemap();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlesavemap, edges, nodes, edge_type]);
  return (
    <div className="w-full h-full wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        deleteKeyCode={null}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => {
          setSelectedIdNode(node.id);
        }}
        onEdgeClick={(_, edge) => {
          setSelectedIdEdge(edge.id);
        }}
        attributionPosition="bottom-left"
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <Background variant="dots" />
        <MiniMap nodeColor={nodeColor} />
        <Controls />
        {/* <Panel position="top-right">
          <button
            onClick={() =>
              getLayoutedElements({
                "elk.algorithm": "layered",
                "elk.direction": "DOWN",
              })
            }
          >
            vertical layout
          </button>
          <button
            onClick={() =>
              getLayoutedElements({
                "elk.algorithm": "layered",
                "elk.direction": "RIGHT",
              })
            }
          >
            horizontal layout
          </button>
          <button
            onClick={() =>
              getLayoutedElements({
                "elk.algorithm": "org.eclipse.elk.radial",
              })
            }
          >
            radial layout
          </button>
          <button
            onClick={() =>
              getLayoutedElements({
                "elk.algorithm": "org.eclipse.elk.force",
              })
            }
          >
            force layout
          </button>
        </Panel> */}
      </ReactFlow>
    </div>
  );
};
function nodeColor(node) {
  if (node.id === "1") {
    return "#00aaff";
  } else {
    return "#ff0072";
  }
}
export default AddNodeOnEdgeDrop;
