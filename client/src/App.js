import React, { Component } from "react";
import socketIOClient from "socket.io-client";

const Account = (props) => {
  return (
    <li>
      <h3>{ props.account.bank_name }</h3>
      <p>{ props.account.account_number }</p>
      <code>
        <small>{ JSON.stringify(props.account) }</small>
      </code>
    </li>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      accounts: []
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);

    socket.on('FromAPI', data => {
      // Get new account data
      console.log(data)

      // Add to array
      this.setState({ 
        accounts: this.state.accounts.concat(data) 
      })
    });
  }

  render() {
    // const { response } = this.state;
    // const responseArray = this.state.response.data
    // const responseParsed = JSON.parse(responseArray)
    
    let items = this.state.accounts.map(a => <Account account={a} />)

    return (
      <div>
        <h1>{ this.state.accounts.length === 0 ? 'Fetching ' : this.state.accounts.length } Accounts</h1>

        <ul>{items}</ul>
     </div>
    );


// return (
//   <div>
//     <ul>
//     {responseParsed.map((item,index) => 
//       <li key={index}>{item}</li>
//      )}
//    </ul>
//   </div>
// );


   };
}


export default App;





 