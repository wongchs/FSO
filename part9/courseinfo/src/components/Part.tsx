const Part = (props: { part: CoursePart }) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>{props.part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>Group project count: {props.part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>{props.part.description}</p>
          <p>Background material: {props.part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {props.part.name} {props.part.exerciseCount}
          </h3>
          <p>{props.part.description}</p>
          <p>Requirements: {props.part.requirements.join(", ")}</p>
        </div>
      );
  }
};

export default Part;
