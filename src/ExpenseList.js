import "./ExpenseList.css"; // Assuming correct import path for styles

function ExpenseList({ title = "", dateOfExpense = "", cost = 0, currency="", i=0}) {
    
    function formatYearsMonths(dateOfExpense) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        const date = new Date(dateOfExpense);
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        let result = `${monthName} ${day}, ${year}`;
    
        return result;
    }

  return (
    <div className="assetListContainer" >
      <div className={i % 2 === 0 ? "evenRow" : "oddRow"}>
        <div className="assetTitle">{title}</div>
        <div className="assetDetails">
            <div className="details1"><span style={{ fontSize: '2vh' }}>{currency}</span> {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="details2">{formatYearsMonths(dateOfExpense)}</div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
