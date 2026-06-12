import { Handle, Position } from '@xyflow/react';

const leafNodes = ['n3', 'n4', 'n5', 'n6'];

const OrgNode = ({ data, id }) => {
  const isLeaf = leafNodes.includes(id);
  const name = data?.name || data?.label || 'Unknown';
  const designation = data?.designation || data?.role || 'Designation';
  const department = data?.department;
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <div className="node">
      {id !== 'n1' && <Handle type="target" position={Position.Top} />}

      <div className="w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-semibold text-white shadow-sm">
            {initials || 'HR'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
            <p className="truncate text-xs text-slate-500">{designation}</p>
          </div>
        </div>

        {department && (
          <div className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-600">
            {department}
          </div>
        )}
      </div>

      {!isLeaf && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
}

export default OrgNode;