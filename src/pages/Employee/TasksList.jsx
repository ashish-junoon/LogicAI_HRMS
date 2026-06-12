import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import { ArrowLeftFromLine, ArrowRightFromLine, Plus, SquareChartGantt } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'
import { useDraggable, useDroppable, DragDropProvider, DragOverlay } from '@dnd-kit/react';
import Droppable from '../../components/Droppable';
import Draggable from '../../components/Draggable';
import ActivitySidebar from '../../components/Activity';
import { dummyActivities } from '../../content/dummyData';
import Modal from '../../components/utils/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorMsg from '../../components/utils/ErrorMsg';
import SelectInput from '../../components/fields/SelectInput';


const TasksList = () => {
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [target, setTarget] = useState('dropAssign');
  const [activities, setActivities] = useState(dummyActivities);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState({
    assigned: [
      { id: 'task-1', title: 'Prepare salary report', priority: 'High' },
      { id: 'task-2', title: 'Update employee records', priority: 'Medium' },
    ],
    progress: [],
    completed: [],
  });

  const taskFormik = useFormik({
    initialValues: {
      title: '',
      date: '',
      time: '',
      priority: '',
      assignee: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('title is required'),
      date: Yup.string().required('date is required'),
      time: Yup.string().required('time is required'),
      priority: Yup.string().oneOf(['Low', 'Medium', 'High']).required('priority is required'),
      assignee: Yup.string().required('assignee is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      setIsModalOpen(false)
    }
  })

  return (
    <div className='flex grid-cols-12 h-full'>
      {/* content  */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* header */}
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task List</h1>
            <p className="text-gray-600 text-sm mt-1">Today: {new Date().toLocaleDateString('en-in')}</p>
          </div>
          <div className='flex gap-4'>
            <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Add Task</Button>
            {!isActivityOpen && <Button
              icon={SquareChartGantt}
              onClick={() => setIsActivityOpen(!isActivityOpen)}
              style={isActivityOpen ? 'bg-pink-600' : 'bg-white !text-pink-600'}
            />}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 pb-2 pt-3 border border-gray-200">
          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center justify-between -mt-1">
              <h2 className="text-lg font-semibold text-gray-900">
                Project XYZ
              </h2>
            </div>

            {/* dnd container  */}
            <div className='overflow-x-auto'>
              <div className="grid grid-cols-3 gap-4 h-full  min-w-225 pb-2">
                <DragDropProvider
                  onDragEnd={(event) => {
                    if (event.canceled) return;

                    const { source, target } = event.operation;
                    if (!source || !target) return;

                    // const { active, over } = event;

                    console.log(source, target);
                    // if (over && active.data.current.supports.includes(over.data.current.type)) {
                    //   // do stuff
                    //   console.log("working?")
                    // }
                    // return;

                    // source & target droppable id
                    const taskId = source.id; // task id
                    const sourceId = source?.data?.column; // source id
                    const targetId = target?.id; // target id
                    console.log(taskId, sourceId, targetId);

                    if (!sourceId || !targetId) return; // should exist
                    if (sourceId === targetId) return; // should not be same

                    setTasks(prev => {
                      // find the dragged task
                      // console.log({ taskId, sourceCol, targetCol });
                      const task = prev[sourceId].find(t => t.id === taskId); // taskId

                      return {
                        ...prev,
                        [sourceId]: prev[sourceId].filter(t => t.id !== taskId),
                        [targetId]: [...prev[targetId], task],
                      };
                    });
                  }}
                >

                  <Droppable id="assigned" title={'Tasks Assigned'}>
                    {tasks.assigned.map(task => (
                      <Draggable key={task.id} task={task} columnId={'assigned'} />
                    ))}
                  </Droppable>

                  <Droppable id="progress" title={'In Progress'}>
                    {tasks.progress.map(task => (
                      <Draggable key={task.id} task={task} columnId={'progress'} />
                    ))}
                  </Droppable>

                  <Droppable id="completed" title={'Tasks Completed'}>
                    {tasks.completed.map(task => (
                      <Draggable key={task.id} task={task} columnId={'completed'} />
                    ))}
                  </Droppable>

                </DragDropProvider>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* activity sidebar */}
      <ActivitySidebar isOpen={isActivityOpen} activities={activities} onClose={() => setIsActivityOpen(false)} />

      <Modal
        title={'Create Task'}
        description={'Create a task to be done'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formId="taskForm"
      >
        <form id="taskForm" onSubmit={taskFormik.handleSubmit}>
          {/* title */}
          <div className='mb-4'>
            <label className="text-xs text-gray-700 mb-1 block">
              Task Name
            </label>
            <input
              name="title"
              {...taskFormik.getFieldProps('title')}
              placeholder="e.g. Prepare payroll report"
              className="w-full px-4 py-2.5 rounded-lg focus:bg-white outline-gray-300 border border-gray-300 transition text-sm"
            />
            {taskFormik.touched.title && taskFormik.errors.title ? (
              <ErrorMsg error={taskFormik.errors.title} />
            ) : null}
          </div>

          <div className="space-y-4">
            {/* date time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-700 mb-1 block">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  {...taskFormik.getFieldProps('date')}
                  className="w-full px-3 py-2 rounded-lg bg-white outline-gray-300 border border-gray-300 text-sm"
                />
                {taskFormik.touched.date && taskFormik.errors.date ? (
                  <ErrorMsg error={taskFormik.errors.date} />
                ) : null}
              </div>

              <div>
                <label className="text-xs text-gray-700 mb-1 block">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  {...taskFormik.getFieldProps('time')}
                  className="w-full px-3 py-2 rounded-lg bg-white outline-gray-300 border border-gray-300 text-sm"
                />
                {taskFormik.touched.time && taskFormik.errors.time ? (
                  <ErrorMsg error={taskFormik.errors.time} />
                ) : null}
              </div>
            </div>

            {/* priority + assignee */}
            <div className="grid grid-cols-2 gap-3">
              <SelectInput
                label={"Priority"}
                name="priority"
                {...taskFormik.getFieldProps('priority')}
                options={[
                  { label: "Low", value: "Low" },
                  { label: "Medium", value: "Medium" },
                  { label: "High", value: "High" },
                ]}
                error={taskFormik.touched.priority && taskFormik.errors.priority}
              />

              <SelectInput
                label={"Assignee"}
                name="assignee"
                {...taskFormik.getFieldProps('assignee')}
                options={[
                  { label: "John Doe", value: "John Doe" },
                  { label: "Jane Smith", value: "Jane Smith" },
                  { label: "HR Manager", value: "HR Manager" },
                ]}
                error={taskFormik.touched.assignee && taskFormik.errors.assignee}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default TasksList;