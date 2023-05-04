import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { InputGroup, Input, Button, FormGroup, Spinner, Label } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import BookInfo from './BookInfo';
import imageNotFound from '../src/images/not_found.png';
import { Container, Row, Col } from 'reactstrap';

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const searchBooks = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error('El número máximo de resultados debe estar comprendido entre 1 y 40.');
    } else {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`).then(res => {
        if (res.data.items.length > 0) {
          console.log(res.data.items);
          setBooks(res.data.items);
          setLoading(false);
        }
      }).catch(err => {
        setLoading(true);
        console.log(err.response);
      });
    }
  }


  const bookloader = () => {
    if (loading) {
      return (
        <div className="spinner-container">
          <div className="spinner-line"></div>
        </div>
      );
    } else {
      const items = books.map((item, i) => {

        let imageItem = imageNotFound;
        let descriptionItem = 'No hay descripción';
        let authorsItem = 'Anónimo';

        if (item.volumeInfo.imageLinks) {
          imageItem = item.volumeInfo.imageLinks.thumbnail;
        }
        if (item.volumeInfo.description) {
          descriptionItem = item.volumeInfo.description;
        }
        if (item.volumeInfo.authors) {
          authorsItem = item.volumeInfo.authors;
        }

        return (
          <div class="bookcard">
            <BookInfo
              image={imageItem}
              title={item.volumeInfo.title}
              authors={authorsItem}
              description={descriptionItem}
            />
          </div>
        );
      });
      return (
        <div>
          <div className='container'>{items}</div>
        </div>
      );
    }
  }

  return (

    <div>
      <ToastContainer />
      <div style={{ textAlign: 'center' }}>
        <Helmet className="headTittle">
          <title>Google Books</title>
          <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        </Helmet>
        <h1 className='title'> Google Books </h1>
        <div>
          <InputGroup>
            {/* <Label for='query'>Título: </Label>
            */}
            <div class="search-container">
              <Input className="inputSearch" id='query' placeholder='Introduce el titulo del libro a buscar' value={query} onChange={e => setQuery(e.target.value)} />
              <Button type="submit" className='searchButton' onClick={searchBooks}> Buscar <i class="fa fa-search"></i></Button>
            </div>
            <FormGroup>
              <div class="formGroup">
                <Label className="numResultsLabel" for='maxResults'>Nº máximo de resultados: </Label>
                <Input className="inputSearch" id='maxResults' type='number' placeholder='Introduce el nº maximo de resultados a mostrar' value={maxResults} onChange={e => setMaxResults(e.target.value)} min={1} max={40} />
              </div>
            </FormGroup>
          </InputGroup>
        </div>
      </div>
      {bookloader()}
    </div>
  );
}

export default App;