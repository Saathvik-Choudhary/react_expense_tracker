import './App.css';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary'; // Assuming correct import path
import SaveExpense from './SaveExpense';
import React, { useState, useEffect } from 'react';

function App() {

  const [activeSection, setActiveSection] = useState('Home'); // Initial active section

  const [isHomeButtonClicked, setIsHomeButtonClicked] = useState(false); // Home button state
  const [isAssetButtonClicked, setIsAssetButtonClicked] = useState(false); // Asset button state

  const handleHomeClick = () => {
    setActiveSection('Home');
    setIsHomeButtonClicked(true); // Set Home button as clicked
    setIsAssetButtonClicked(false); // Reset Asset button state
  };

  const handleAssetClick = () => {
    setActiveSection('Spend');
    getExpenseList();
    setIsAssetButtonClicked(true); // Set Asset button as clicked
    setIsHomeButtonClicked(false); // Reset Home button state
  };

  const handleSaveClick = () => {
    setActiveSection('Save');
  };


  const [list, setExpenseList] = useState([]);

  useEffect(() => {
        getExpenseList();
  }, []);

const getExpenseList = () =>{
     fetch('http://localhost:8080/expenses')
    .then((res) => {
        return res.json();
    })
    .then((response) => {
         console.log(response);
         setExpenseList(response.content);
       })
    }


  return (
    <div className="App">
      <header className="App-header">
        <div className="App-heading">
          <p className="heading">$pend</p>
        </div>

        <div className="DynamicContainer">
          {activeSection === 'Home' && <ExpenseSummary />}
          {activeSection === 'Spend' && (
            <>
              <button className="newAsset" onClick={handleSaveClick}>
                <div className="ButtonName">New</div>
              </button>
              {
              list.map((item,index) => (
              <ExpenseList key={index}
                            title={item.title} 
                            dateOfExpense = {item.dateOfExpense} 
                            cost ={item.cost}
                            currency={item.currency}
                            i={index}
              />
              ))}
            </>
          )}
          {activeSection === 'Save' && <SaveExpense />}

        </div>

        <div className="StaticContainer">
          <button
            style={{ backgroundColor: isHomeButtonClicked ? '#45474B' : '#000' }}
            className="HomeButton"
            onClick={handleHomeClick}
          >
            <div className="contents">Home</div>
          </button>

          <button
            style={{ backgroundColor: isAssetButtonClicked ? '#45474B' : '#000' }}
            className="AssetsButton"
            onClick={handleAssetClick}
          >
            <div className="contents">Spend</div>
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
