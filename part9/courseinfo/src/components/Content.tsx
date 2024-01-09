import Part from "./Part";

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
