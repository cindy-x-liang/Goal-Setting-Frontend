import { useState } from "react";
import { useHistory } from 'react-router-dom';
import useFetch from "./useFetch";
import LogList from "./LogList";
const LogDetails = () => {
  const [date, setTitle] = useState('');
  const [message, setCategory] = useState('');
  const [score, setScore] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = { date, message };

    fetch('/logs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal)
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        console.log(data);
        setScore(data);
        window.location.reload();
      })
  }

  const deleteTodo = (id) => {
    fetch('/logs/' + id, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      console.log('new goal added');
      window.location.reload();

    })
  };


  const { error, isPending, data: logs } = useFetch('/logs')


  return (
    <div className="create">
      <h2>add a journal entry or just log how you're feeling:</h2>
      <form onSubmit={handleSubmit}>
        <label>date:</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>how do you feel:</label>
        <textarea
          required
          value={message}
          onChange={(e) => setCategory(e.target.value)}
        ></textarea>

        <button>submit</button>
      </form>

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {logs && <LogList logs={logs} deletetodo={deleteTodo} />}


    </div>


  );
}

export default LogDetails;