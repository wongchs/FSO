const Total = ({ parts }) => {
  const initial = 0;
  const sum = parts.reduce(
    (accumulator, current) => accumulator + current.exercises,
    initial
  );

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  );
};

export default Total;
