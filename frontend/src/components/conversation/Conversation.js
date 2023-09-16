import React , { useContext } from 'react';
import StackedCards from '../stackedcards/StackedCards'
import './conversation.css'
import MyContext from '../../MyContext';
import  summarizer  from 'summarize/index';


function Conversation({ title, content }) {
  const { data, setData } = useContext(MyContext);
  const summary = (data) => {
       return summarizer(data)
  }
  return (
    <div className="">
      <h1>{summary(data)}</h1>
     <StackedCards />
    </div>
  );
}

export default Conversation;