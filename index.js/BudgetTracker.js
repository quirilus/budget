export default class BudgetTracker{
    constructor(querySelectorString){
        this.root = document.querySelector(querySelectorString);
        this.root.innerHtml = BudgetTracker.html();

        this.root.querySelector(".new-enrty").addEventListener("click",() =>{
            onNewEntryBtnClick();
        });

        //load initial data from local storage
        this.load();


    }
    static html(){
        return`
        <thead>
        <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody class="entries"> 
    </tbody>
    <tbody>
        <tr>
            <td colspan="5" class="control">
                <button class="new-entery">new entery</button>

            </td>
        </tr>
    </tbody>
    <footer>
        <tr>
            <td colspan="5" class="summary">
                <strong>total:</strong>
                <span class="total">$0.00</span>
            </td>
        </tr>
    </footer>
</table>
        `

        ;

    }
    static entryHtml(){
        return`
        <tr>
        <td>
            <input class="input input date" type="date">
        </td>
        <td>
            <input class="input input Description" type="text" placeholder="Add description e.g bills etc">
        </td>
        <td>
           <select class="input input-Type">
            <option value="income">income</option>
            <option value="expense">expense</option>

           </select>
        </td>

           <td>
            <input type="number" class="input input-amount">
        </td>
    <td>
        <button type="button" class="delete-entry">X</button>
    </td>
      

    </tr>
        `;

    }
    load(){
        const entries =JSON.parse(localStorage.getItem(budget-tracker-entries-dev) || "[]");
        console.log(entries);
        for(const entry of entries){
            this.addEntry = (entry);
        }
        this.updateSummary();

    }
    updateSummary(){
        const total = this.getEntryRows().reduce((total,row) => {
            const amount =row.querySelector(".input-amount").value;
            const isExpense =row.querySelector(".input-type").value ==="expense";
            const modifier =isExpense? -1 :1;
            return total+(amount*modifier);
        },0);
        const totalFormatted = new Intel.NumberFormatted("en-US",{
            style: "currency",
            currency :"USD"
        }).format(total);
        this.root.querySelector(".total").textContent = totalFormatted;

    }
    save(){ // will save and store all the data into localStorage.
        const data = this.getEntryRows().map(row =>{
            return{
                date: row.querySelector(".inpute-date").value,
                description: row.querySelector(".inpute-description").value,
                type: row.querySelector(".inpute-type").value,
                amount: row.querySelector(".inpute-amount").value,
            };
        });
        localStorage.setItem("budget-tracker-entries-dev",JSON.stringify(data));
        this.updateSummary();

c


    }
    getEntryRows(){ // will help us return all the active rows
        return array.from(this.root.querySelectorAll(".entries tr"));

    }
    onNewEntryBtnClick(){
        this.addEntry();

    }
    onDeleteEntryBtnClick(){
        e.terget.closest("tr").remove();
        this.save();


    }

}