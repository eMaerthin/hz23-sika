// MyProvider.js
import React, { useState } from 'react';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState("hi i am john and this is a random text with no periods or capitals or commas this is just simply a random text with no hard words that many find challenging to type in due to the unusual order of the letters so i thought id just keep it easy thought thought thought thought thats a easy word to type depending on youre your highest WPM rank");

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
