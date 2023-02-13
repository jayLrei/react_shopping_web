import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItem } from "../store.js";

let Box = styled.div`
  padding : 20px;
  color : grey
`;
let YellowBtn = styled.button`
  background : yellow;
  color : black;
  padding : 10px;
`;

function Detail(props){
    let stores = useSelector((state)=>{return state.store})
    console.log(stores)

    let dispatch = useDispatch();
    let [tab, setTab] = useState(0);

    let {id} = useParams();
    console.log(id);
    console.log(parseFloat(id));

    let numid = parseFloat(id);
    
    let findShoes = props.shoes.find(function(x){
        return x.id == id
    });
    let [alert,setAlert] = useState(true);
    let [inputvalue, setInputValue] = useState('');
    let onChangeInput = (e)=>{
        setInputValue(e.target.value)
    }
    let [fade2,setFade2] = useState('')
    
    useEffect(()=>{
        setTimeout(()=>{setFade2('end')},100)
        return ()=>{
            setFade2('')
        }
    },[Detail])

    useEffect(()=>{
        setTimeout(()=>{
            alert = false;
            setAlert(alert);
        },2000)
    },[])


    return(
        <div className={"container start" + fade2}>
            <div className="row">
                {
                    alert == true ? <div className="container"><div className="alert alert-warning">2초뒤에 없어지는 박스</div></div> : null
                }
                <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+[numid+1]+".jpg"} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">{findShoes.id} {findShoes.title}</h4>
                <p>{findShoes.content}</p>
                <p>{findShoes.price}원</p>
                <button className="btn btn-danger" onClick={()=>{
                    dispatch(addItem({
                        id :findShoes.id, name : findShoes.title, count : 1
                    }))
                }}>주문하기</button>
                <p></p>
                <input type="text" onChange={onChangeInput}/>
                {
                    isNaN(inputvalue) == false || inputvalue == ''? null :
                    <div className="alert alert-primaty">
                        <div>문자 입력하지 마세용</div>
                        <div>넹 ㅜ</div>
                    </div>
                }
                </div>
                <Nav variant="tabs"  defaultActiveKey="link0">
                    <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tabcontent tab={tab}></Tabcontent>
            </div> 
        </div>
    )
}
function Tabcontent({tab}){
    let [fade,setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{setFade('end')},100)
        return ()=>{
            setFade('')
        }
    },[tab])

    return (
    <div className={'start'+ fade}>
    {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab]}
    </div>
    )
}
export default Detail;