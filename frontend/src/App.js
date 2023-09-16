import './App.css';
import Chat from './components/chat/Chat';
import Shortcut from './components/shortcut/Shortcut';
import Conversation from './components/conversation/Conversation';
import Document from './components/document/Document';
import Recommendation from './components/recommendation/Recommendation';
import VerticalDivider from './components/verticaldivider/VerticalDivider';

function App() {
  const documentTitle = 'My Document';
  const documentContent = (
    <p>
      This is a sample document-styled component in React. You can customize it
      further to suit your needs.
    </p>
  );
  const toolbarItems = [
    { label: 'Profile', id: 1 },
    { label: 'Messages', id: 2 },
    { label: 'Transactions', id: 3 },
  ];

  const handleItemClick = (item) => {
    console.log(`Button ${item.id} clicked`);
    // Add your custom logic here when a button is clicked
  };

  return (
    <div className='App'>
      <div class='two-column-layout'>
        <div class='left-column'>
          <header className=''>
            <Shortcut items={toolbarItems} onItemClick={handleItemClick} />
          </header>
        </div>
        <div class='right-column'>
          <main>
            <div className='main'>
              <div className='chat-box'>
                <div className='first'>
                  <Conversation />
                </div>
                <div className='second'>
                  <Chat />
                </div>
              </div>
              <div className='document-box'>
                <div className='third'>
                  <Document title={documentTitle} content={documentContent} />
                </div>
                <div className='fourth'>
                  <Recommendation />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
