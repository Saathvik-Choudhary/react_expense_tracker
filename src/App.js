import './App.css';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary'; // Assuming correct import path
import SaveExpense from './SaveExpense';
import React, { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('Home'); // Initial active section

  const [isButtonClicked, setIsButtonClicked] = useState(false); // Button state

  const buttonStyle1 = isButtonClicked ? { backgroundColor: '#45474B' } : {backgroundColor:'#000'};

  const buttonStyle2 = isButtonClicked ? { backgroundColor: '#000' } : {backgroundColor: '#45474B'};


  const handleHomeClick = () => {
    setActiveSection('Home');
    setIsButtonClicked(!isButtonClicked); // Toggle state on click
  };

  const handleAssetClick = () => {
    setActiveSection('Spend');
    setIsButtonClicked(!isButtonClicked); // Toggle state on click
  };

  const handleSaveClick = () => {
    setActiveSection('Save');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-heading">
          <p className="heading">$pend</p>
        </div>

        <div className="DynamicContainer">
          {activeSection === 'Home' && <ExpenseSummary />}
          {activeSection === 'Spend' &&(
            <>
              <button className="newAsset" onClick={handleSaveClick}>
                <div className="ButtonName">New</div>
              </button>
              {

              }
              <ExpenseList/>
            </>
          )}
          {activeSection === 'Save' && <SaveExpense />}

          
        </div>
        
        <div className="StaticContainer">
          <button style={buttonStyle1} className="HomeButton" onClick={handleHomeClick}>
            <div className="contents">Home</div>
          </button>

          <button style={buttonStyle2} className="AssetsButton" onClick={handleAssetClick}>
            <div className="contents">Spend</div>
          </button>
        </div>
      </header>

    </div>
  );
}

export default App;