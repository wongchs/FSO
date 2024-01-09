const Total = (props: { courseParts: CoursePart[] }) => {
  const totalExercises = props.courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
