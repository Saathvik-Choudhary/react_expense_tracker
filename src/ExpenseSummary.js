import './ExpenseSummary.css'
import { useState, useEffect } from 'react';


function ExpenseSummary(){
   
    
    const [expenseSummary, setExpenseSummary] = useState(null);

  useEffect(() => {

        getData();
  }, []);

  
const getData = () =>{
    fetch('http://localhost:8080/expense/summary')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
         console.log(data);
         setExpenseSummary(data);
       })
    }

    return(
        
        <div className="Summary-Container">
            <div className="Month1Summary">
            <div className="containere">
                <div className="content">previousMonth1</div>

                <div className="contentValue">
                   USD: {expenseSummary?.previousMonth1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div></div>
            </div>

            <div className="Month2Summary">
            <div className="containere">
                <div className="content">previousMonth2</div>
                
                <div className="contentValue">
                   USD: {expenseSummary?.previousMonth2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div></div>
            </div>

            <div className="Month3Summary">
            <div className="containere">
                <div className="content">previousMonth3</div>

                <div className="contentValue">
                        USD: {expenseSummary?.previousMonth3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div></div>
            </div>

        </div>
    )
}

export default ExpenseSummary;