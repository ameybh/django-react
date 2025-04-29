import { useEffect, useState } from "react";
import api from "../api";

type Note = {
  id: number;
  title: string;
  content: string;
};

function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getNote();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post("/api/notes/", { title, content }).then(() => {
      getNote();
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <p>{note.title}</p>
            <p>{note.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
}

export default Home;
