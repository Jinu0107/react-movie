import React, { useState } from 'react';
import MovieList from 'components/MovieList';
import MovieDetail from 'components/MovieDetail';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, FormControl } from 'react-bootstrap';

function App() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState({
    target: '',
    isSorting: false
  })

  const onInputSearch = (e: any) => {
    if (e.key == 'Enter') {
      setKeyword(e.currentTarget.value);
    }
  }

  const onClickReset = () => {
    setKeyword("");
  }

  const onClickNameSort = () => {
    if (!sort.isSorting) {
      setSort({
        target: 'name',
        isSorting: true
      })
    } else {
      setSort({
        target: '',
        isSorting: false
      })
    }
  }

  return (
    <>
      <header>
        <Container>
          <h2>영화 검색 사이트</h2>
          <div>
            <FormControl
              placeholder="영화제목을 입력하세요"
              onKeyPress={onInputSearch}
            />
            <Button variant="outline-danger" onClick={onClickReset}>초기화</Button>
          </div>
          <div>
            <Button variant={`${sort.target != 'name' && !sort.isSorting ? 'outline-' : ''}secondary`} onClick={onClickNameSort}>이름기준 정렬</Button>
          </div>
        </Container>
      </header>
      <Container className="App">

        <Switch>
          <Route path="/" exact render={(props) => <MovieList {...props} keyword={keyword} sort={sort} />} />
          <Route path="/detail/:movieCd" component={MovieDetail} />
        </Switch>
      </Container>
    </>

  );
}

export default App;
