import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.js'
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';

function App() {
  let navigate = useNavigate();

  let [shoes,setShoes] = useState(data);

  return (
    <div className="App">

      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/detail/0')}}>detail</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <Routes>
        <Route path="/" element={
          <div>
            <div className='main-bg'></div>
              <div className='container'>
                <div className='row'>
                {
                  shoes.map((a,i)=>{
                    return(
                      <Card shoes={shoes} num={i} key={i}></Card>
                    )
                  })
                }
                </div>
                <button onClick={()=>{
                  axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
                    console.log(result.data);
                    setShoes(shoes.concat(result.data));
                  }).catch(()=>{
                    console.log('요청실패해부렸으')
                  })
                }}>상품 더 보기</button>
              </div>
          </div>
        }></Route>

        <Route path="/detail/:id" element={
          <Detail shoes={shoes}></Detail>
        }></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path="/about" element={
          <About></About>
        }>
          <Route path="member" element={ <div>멤버들</div> } />
          <Route path="location" element={ <div>회사위치</div> } />
        </Route>
        <Route path='/event' element={<EventPage></EventPage>}>
          <Route path='1' element={<p>첫 주문시 에어팟이 무료!</p>}></Route>
          <Route path='2' element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>
        <Route path='*' element={<div>없는 페이지임.</div>}></Route>
      </Routes>

    </div>
  );
}

function Card(props){
  return(
    <div className="col-md-4">
    <img src={"https://codingapple1.github.io/shop/shoes"+[props.num+1]+".jpg"} width="80%" />
    <h4>{props.shoes[props.num].title}</h4>
    <p>{props.shoes[props.num].price}</p>
  </div>
  )
}
function About(){
  return (
    <div>
      <h4>About 페이지인데유?</h4>
      <Outlet></Outlet>
    </div>
  )
}
function EventPage(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <button>1</button>
      <button>2</button>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
