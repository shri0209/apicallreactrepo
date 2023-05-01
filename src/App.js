import "./styles.css";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function App() {
  const [title, setTitle] = useState("");
  const [first, setFirstName] = useState("");
  const [last, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const getData = useCallback(async () => {
    const response = await axios.get("https://randomuser.me/api");

    const result = response.data.results[0].name;
    const { title, first, last } = result;
    setTitle(title);
    setFirstName(first);
    setLastName(last);

    const email = response.data.results[0].email;
    setEmail(email);

    // Save data to local storage
    localStorage.setItem(
      "fullname",
      JSON.stringify(`${title} ${first} ${last}`)
    );
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="App">
      <table className="table">
        <tbody>
          <tr className="tr">
            <td id="fullname">Full Name </td>
            <td id="name">
              {title}. {first} {last}
            </td>
          </tr>
          <tr>
            <td id="email">Email</td>
            <td id="mail">{email}</td>
          </tr>
        </tbody>
      </table>

      <button className="refresh" onClick={getData}>
        Refresh
      </button>
    </div>
  );
}
