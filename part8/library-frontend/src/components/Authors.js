import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import AuthorYearForm from "./AuthorYearForm";

const Authors = ({ show, setError}) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorYearForm setError={setError} />
    </div>
  );
};

export default Authors;
