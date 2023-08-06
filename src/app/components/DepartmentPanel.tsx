import DepartmentCard from './DepartmentsCard';

const DepartmentPanel = () => {

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(department => (
        <DepartmentCard
          key={department}
        />
      ))}
    </>
  );
}

export default DepartmentPanel;
