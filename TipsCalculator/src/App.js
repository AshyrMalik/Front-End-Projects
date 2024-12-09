import { useState } from "react";

function App() {
  return (
    <div className="App">
      <HandleBill />
    </div>
  );
}

function HandleBill() {
  const [amount, setAmount] = useState(0);
  const [tip, setTip] = useState(0);
  const [tip1, setTip1] = useState(0);

  function handleReset() {
    setAmount(0);
    setTip(0);
    setTip1(0);
  }
  return (
    <div className="App">
      <Bill amount={amount} handleSetAmount={setAmount} />
      <Service tip={tip} handleTip={setTip}>
        Did you like the service?
      </Service>
      <Service tip={tip1} handleTip={setTip1}>
        Did your friend like the service?
      </Service>
      <Total amount={amount} tip={tip} tip1={tip1} />
      <Reset handleReset={handleReset} amount={amount} />
    </div>
  );
}

function Bill({ amount, handleSetAmount }) {
  return (
    <div>
      <span>How much was the bill? </span>
      <input
        type="number"
        placeholder="Enter bill amount"
        value={amount}
        onChange={(e) => handleSetAmount(Number(e.target.value))}
      />
    </div>
  );
}

function Service({ children, handleTip, tip }) {
  return (
    <div>
      <span>{children}</span>
      <select value={tip} onChange={(e) => handleTip(Number(e.target.value))}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was fine (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Total({ tip, amount, tip1 }) {
  if (amount === 0) return null;

  return (
    <h1>
      Your total amount is{" "}
      {amount + amount * (tip / 100) + amount * (tip1 / 100)}
    </h1>
  );
}

function Reset({ handleReset, amount }) {
  if (amount === 0) return null;
  return <button onClick={handleReset}>Reset</button>;
}

export default App;
