import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { InputGroup, Input, Button, FormGroup, Label} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  
  const searchBooks = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error('El número máximo de resultados debe estar comprendido entre 1 y 40.');
    } else {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`).then(res => {
          if (res.data.items.length > 0) {
            console.log(res.data.items);
            //setCards(res.data.items);
            //setLoading(false);
          }
      }).catch(err => {
          //setLoading(true);
          console.log(err.response);
        });
    }
  }


  return (
    
    <body>
      <ToastContainer />
      <Helmet>
        <title>GoogleBooks</title>
      </Helmet>
        <h1 className='title'> Google Books </h1>
        <div>
          <InputGroup>
            <Label for='query'>Título: </Label>
            <Input id= 'query' placeholder='Introduce el titulo del libro a buscar' value={query} onChange={e => setQuery(e.target.value)} />
            
              <Button className='searchButton' onClick={searchBooks}>
                Buscar
              </Button>

              <FormGroup >
              <Label for='maxResults'>Nº máximo de resultados: </Label>
              <Input id='maxResults' type='number' placeholder='Introduce el nº maximo de resultados a mostrar' value={maxResults} onChange={e => setMaxResults(e.target.value)} min={1} max={40}/>
              </FormGroup>

          </InputGroup>
        </div>
    </body>
  );
}

export default App;