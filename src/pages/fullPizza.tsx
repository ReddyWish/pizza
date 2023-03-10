import React from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const FullPizza: React.FC = () => {
  const {id} = useParams()
  const [pizza, setPizza] = React.useState<{
      imageUrl: string,
      name: string,
      price: string
  }>()

  React.useEffect(() => {
    async function fetchPizza() {
     try {
       const {data} = await axios.get('https://63dccccf2308e3e319edf3ff.mockapi.io/items/' + id);
       setPizza(data)
     } catch (e) {
       console.log(e)
     }
    }
    fetchPizza()
  }, [])

if (!pizza) {
  return <>"Loading..."</>
}

  return (
    <div className="container" style={{display: "flex", alignItems:"center", flexDirection:"column"}}>
      <img src={pizza.imageUrl} style={{width: 200, height:200}} alt="pizza"/>
      <h2 style={{marginBottom: 7, textAlign:"center"}}>{pizza.name}</h2>
      <h4>{pizza.price} rub</h4>
            <Link to="/" className="button button--cart" style={{marginTop: 7}}>
                <span>Вернуться назад</span>
            </Link>
    </div>
  );
}

export default FullPizza;