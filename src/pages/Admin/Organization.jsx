import React, { useCallback, useState } from 'react'
import Button from '../../components/utils/Button';
import { Plus } from 'lucide-react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import OrgNode from '../../components/OrgNode';

const initialNodes = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: {
      name: 'Olivia James',
      designation: 'HR Manager',
      department: 'Human Resources',
    },
    type: 'customNode',
  },
  {
    id: 'n2',
    position: { x: 0, y: 200 },
    data: {
      name: 'Marcus Lee',
      designation: 'Recruitment Lead',
      department: 'Talent Acquisition',
    },
    type: 'customNode',
  },
  {
    id: 'n3',
    position: { x: -300, y: 400 },
    data: {
      name: 'Aisha Patel',
      designation: 'Senior Recruiter',
      department: 'Talent Acquisition',
    },
    type: 'customNode',
  },
  {
    id: 'n4',
    position: { x: -0, y: 400 },
    data: {
      name: 'Derek Smith',
      designation: 'HR Coordinator',
      department: 'Human Resources',
    },
    type: 'customNode',
  },
  {
    id: 'n5',
    position: { x: 300, y: 400 },
    data: {
      name: 'Leila Gomez',
      designation: 'HR Analyst',
      department: 'People Operations',
    },
    type: 'customNode',
  },
  {
    id: 'n6',
    position: { x: 600, y: 400 },
    data: {
      name: 'Ethan Roberts',
      designation: 'HR Assistant',
      department: 'Employee Experience',
    },
    type: 'customNode',
  },
];

const initialEdges = [
  { id: 'n1-n2', source: 'n1', target: 'n2', type: 'step', label: 'manages' },
  { id: 'n2-n3', source: 'n2', target: 'n3',type: 'step' },
  { id: 'n2-n4', source: 'n2', target: 'n4', type: 'step' },
  { id: 'n2-n5', source: 'n2', target: 'n5', type: 'step' },
  { id: 'n2-n6', source: 'n2', target: 'n6', type: 'step' }
];

const Organization = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const nodeTypes = {
  customNode: OrgNode,
};

  return (
    <div className="flex h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Organization Chart
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your organization's structure
            </p>
          </div>
        </div>

        {/* Organization Chart */}
        <div className='w-full h-[70vh] bg-white rounded-lg shadow-sm p-4 pb-2'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            proOptions={{ hideAttribution: true }}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

      </div>
    </div>
  )
}

export default Organization;