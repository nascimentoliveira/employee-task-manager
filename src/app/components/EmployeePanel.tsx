import EmployeeCard from './EmployeeCard';

const EmployeePanel = () => {

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(employee => (
        <EmployeeCard
          key={employee}
        />
      ))}
    </>
  );
}

export default EmployeePanel;
