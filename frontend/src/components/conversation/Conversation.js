import React , { useContext } from 'react';
import StackedCards from '../stackedcards/StackedCards'
import './conversation.css'
import MyContext from '../../MyContext';


function Conversation({ title, content }) {
  const { data, setData } = useContext(MyContext);
  return (
    <div className="">
      <h1>{data}</h1>
     <StackedCards />
    </div>
  );
}

export default Conversation;