# Friends Expense Tracker

This is a simple React application that displays a list of friends and their current balance with you. The app categorizes the balances to show whether you owe money to a friend, the friend owes you money, or if the balance is even.

## Features

- Displays a list of friends with their:
  - Name
  - Profile picture
  - Balance status
- Visual indicators for:
  - Negative balance: You owe the friend money.
  - Positive balance: The friend owes you money.
  - Zero balance: You are even with the friend.
  
## Demo

Here’s an example of what the application looks like:

- **Negative Balance**: *You owe $7 to Clark.*
- **Positive Balance**: *Sarah owes you $20.*
- **Zero Balance**: *You and Anthony are even.*

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/friends-expense-tracker.git
   cd friends-expense-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Components Overview

- **`App`**: The main component that structures the app.
- **`FriendList`**: Renders a list of friends using the `Friend` component.
- **`Friend`**: Displays details about each friend, including their name, image, and balance status.
- **`AddFriends`**: Placeholder for a button to add new friends (to be implemented).

## Data Structure

The app uses an array of objects to represent friends:
```javascript
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
```

## Future Enhancements

- Add functionality to add new friends.
- Enable editing and deleting friends.
- Integrate a backend to persist data.
- Add styles to improve the visual presentation.

## Technologies Used

- **React**: For building the UI.
- **CSS**: For basic styling (you can extend the styles in the project).

## Contribution

Feel free to contribute to this project! Here's how you can help:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

## License

This project is open-source and available under the [MIT License](LICENSE).

Happy Coding! 🎉
