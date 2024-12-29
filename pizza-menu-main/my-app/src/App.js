const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    price: 15,
    ingredients: "Tomato, mozarella, and pepperoni",
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header/>
      <Menu/>
      <Footer/>
    </div>
  );
}
function Header(){
  const style={}
  return <header className="header">
        <h1 className="header" style={style}>React Fast Food Co. </h1>
  </header> 
  }

function Menu(){
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) =>(
          <Pizza pizzaObj={pizza} key={pizza.name}/>
        )
        

        )}
      </ul>
      {/* <Pizza name="Spinachi" photo='pizzas/Spinaci.jpg' ing="ingredients: Tomato, mozarella, spinach, and ricotta cheese " price= {40} />
      <Pizza name="funghi" photo='pizzas/Funghi.jpg' ing="ingredients: Tomato, mozarella, mushrooms, and onion" price= {60} />
      <Pizza name="salamino" photo='pizzas/salamino.jpg' ing="ingredients:Tomato, mozarella, and pepperoniTomato, mozarella, and pepperoni " price= {90}/>   
     */}
    </main>)
}
function Pizza({pizzaObj}){
  return (
    <div className="pizza">

      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <li> 
        <h3>{pizzaObj.name} </h3>
        <p> {pizzaObj.ingredients} </p>  
        <span>{pizzaObj.price}</span>
      </li>
      
    </div>
  )
}

function Footer(){
  const hour =new Date().getHours();
  const openHour=0;
  const closeHour= 22;
  const isOpen = (hour>=openHour && hour<=closeHour);

  return (
    <footer className="footer">
      { isOpen ? (
          <Order close= {closeHour}/>
      ) : <p>We are happy to welcome you between {openHour}:00 and {closeHour}:00</p>}
    </footer>
    )
}

function Order({close}){
  return <div className="order">
          <p>We're Open until {close}:00. Come visit us or order online</p>
          <button className="btn"> Order</button>
  </div>
}
export default App;
