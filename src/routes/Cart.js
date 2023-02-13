import { Table } from 'react-bootstrap' 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addCount } from '../store';

function Cart(){
    let states = useSelector((state => {return state}))
    console.log(states);
    let dispatch = useDispatch()
    let stores = useSelector((state)=>{return state.store})
    console.log(stores);

    return (
        <Table>
        <thead>
            <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            </tr>
        </thead>
        <tbody>
        {
            stores.map((a, i)=>
            <tr key={i}>
                <td>{stores[i].id}</td>
                <td>{stores[i].name}</td>
                <td>{stores[i].count}</td>
                <td><button onClick={()=>{
                    dispatch(addCount(stores[i].id))
                }}>+</button></td>
            </tr>  
            )
        }
        </tbody>
        </Table> 
    )

}

export default Cart;