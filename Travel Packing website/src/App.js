import { useState } from "react";
import "./index.css";

function App() {
  const [items, setItems] = useState([]);

  function handleItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) =>items.filter((item)=>item.id!==id) );
  }
  function handleToggleItem(id){
    setItems(items=>items.map((item) => item.id=== id ? 
        {...item ,packed:!item.packed} :item
      ))
  }
  function handleClearing(){
    const cnfrm= window.confirm("Are you sure")
    if(cnfrm) setItems([]);
    return
  }
  

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearing={handleClearing} />
      <Stats item={items}/>
    </div>
  );
}

function Logo() {
  return <h1>⛳ Far Away 👜</h1>;
}

function Form({ onAddItem }) {
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleEvent(e) {
    e.preventDefault();
    if (!desc) return;

    const newItem = { id: Date.now(), description: desc, quantity, packed: false };
    onAddItem(newItem);
    setDesc("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleEvent}>
      <h3>What do you need for your trip?? 😍</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items,onDeleteItem,onToggleItem,onClearing}) {
  
  
  const [sort,setSort]=useState("input")

  let sortedItems;

  if(sort==="input") sortedItems=items
  
  if(sort==="disc") sortedItems=items.slice().sort((a,b) => a.description.localeCompare(b.description))
  
  if (sort === "packed")  sortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
  
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className="action">
        <select value={sort} onChange={(e) =>setSort(e.target.value) }>
          <option value="input">Sort by input </option>
          <option value="disc">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select> 
        <button onClick={()=>onClearing()}>Clear the list</button>

      </div>
    </div>
    
  );
}

function Item({ item ,onDeleteItem,onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={()=>onToggleItem(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}  
      </span>
      <button onClick={() =>onDeleteItem(item.id)}>📌</button>
    </li>
  );
}

function Stats({item}) {
  if (!item.length){
    return <p className="stats"><em>Start packing things 🎭</em></p>
  }
  const numItems=item.length;
  const numPacked= item.filter((it)=>it.packed).length;
  const per=Math.round((numPacked/numItems)*100)
  return (
    <footer className="stats">
      <em>
        {per===100 ? "You are ready to go ✈" :
        `💼 you have ${numItems} item on your list. You have already packed ${numPacked} items (${per}%)`
        }
      </em>
    </footer>
  );
}

export default App;
