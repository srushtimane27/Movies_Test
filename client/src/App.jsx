import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState({ name: "" });
  const [jokes, setJokes] = useState([]);

  async function getCategory() {
    const options = {
      method: 'GET',
      url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/categories',
      headers: {
        accept: 'application/json',
        'X-RapidAPI-Key': '82af082083mshf57355bad330b86p10f0acjsn20fe2f2ffd7e',
        'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      console.log(response.data)
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    setSelectedCat({ name: event.target.value });
  }

  async function search() {
    const options = {
      method: 'GET',
      url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search',
      params: { query: selectedCat.name },
      headers: {
        accept: 'application/json',
        'X-RapidAPI-Key': '82af082083mshf57355bad330b86p10f0acjsn20fe2f2ffd7e',
        'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      console.log(response.data.result)
      setJokes(response.data.result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="App">
      <div>Select Category</div>
      <select onChange={handleChange}>
        <option value="">select</option>
        {category.map((c, index) => (
          <option value={c} key={index}>
            {c}
          </option>
        ))}
      </select><br />

      <button className="button" onClick={search}>Search</button>

      <div>
        <h2>Jokes</h2>
        <ul>
          {jokes.map((joke, index) => (
            <li key={index}>{joke.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
