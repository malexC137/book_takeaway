import { useState } from "react";
import styles from '../style/Searchbar.module.css';
import Header from "../components/Header";
import Results from "../components/Results";
import axios from 'axios';
import Message from "../components/Message";

function App() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (inputText.trim() === "") {
      return
    }
    // Questo controllo serve qualora si cliccasse cerca senza aver digitato niente nell'input,
    // mentre il metodo trim gestisce il caso in cui venissero inseriti solo spazi
    await setLoading(true);
    const myData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${inputText}`);
    await setData(myData.data);
    // Il .data appena inserito non è lo stesso data che abbiamo per convenzione già utilizzato in tutta la pagina,
    // ma fa riferimento all'oggetto che ci ritorna la chiamata axios, cioè si chiama proprio così
    await setLoading(false);
  }

  const handleInput = (e) => {
    setInputText(e.target.value)
  }

  const showResults = () => {
    if (data.totalItems === 0) {
      return <Message error={true} message="Ricerca senza risultati." />
    } else if (data.length === 0) {
      return <Message message="Cerca qualcosa..." />
    } else {
      return loading ? <Message message="Sto caricando..." /> : <Results data={data} />
    }
  }

  return (
    <div className="App">
      <div className={styles.container}>
        <h1>Cerca un libro</h1>
        <div className={styles.formContainer}>
          <input value={inputText} onChange={handleInput} type="text" name="" id="" />
          <button onClick={fetchData}>Cerca</button>
        </div>
      </div>
      <h1 style={{paddingLeft: '40px'}}>Risultati</h1>
      {showResults()}
    </div>
  );
}

export default App;
