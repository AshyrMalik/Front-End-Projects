
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
      </div>
    </div>
  );
}
function FriendList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend friend={friend} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        
        {friend.balance < 0 && (
          <p className="red">
            You owe {Math.abs(friend.balance)}$ to {friend.name}
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)}$
          </p>
        )}

        {friend.balance === 0 && (
          <p >
            You and {friend.name} are even
          </p>
        )}    
    </li>
  );
}
function AddFriends() {
  return <button></button>;
}

export default App;

