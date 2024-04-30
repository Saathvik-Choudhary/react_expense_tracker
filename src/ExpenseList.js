import "./ExpenseList.css"; // Assuming correct import path for styles

function ExpenseList({ title = "", purchaseDate = "", cost = 0, depreciationRate = 0 ,currentValue=0 , i=0}) {
    
    function formatYearsMonths(purchaseDate) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        const date = new Date(purchaseDate);
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        let result = `${monthName} ${day}, ${year}`;
    
        return result;
    }

  return (
    <div className="assetListContainer" >
      <div className={i % 2 === 0 ? "evenRow" : "oddRow"}>
        <div className="assetTitle">{title}title</div>
        <div className="assetDetails">
            <div className="details1"><span style={{ fontSize: '2vh' }}>USD:</span> {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="details2">{formatYearsMonths(purchaseDate)}</div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
