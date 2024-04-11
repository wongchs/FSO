import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR_YEAR, ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";

const AuthorYearForm = ({ setError }) => {
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [born, setBorn] = useState("");

  const { loading, error, data } = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(`Mutation error: ${error.message}`);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await editAuthor({
        variables: {
          name: selectedAuthor,
          setBornTo: parseInt(born),
        },
      });

      setSelectedAuthor("");
      setBorn("");
    } catch (error) {
      setError(`Error setting author birth year: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Edit Author Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="author">Author:</label>
          <select
            id="author"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Select an author</option>
            {data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="born">Birth Year:</label>
          <input
            type="number"
            id="born"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AuthorYearForm;
