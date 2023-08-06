import TaskCard from './TaskCard';

const TaskPanel = () => {

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(task => (
        <TaskCard
          key={task}
        />
      ))}
    </>
  );
}

export default TaskPanel;
