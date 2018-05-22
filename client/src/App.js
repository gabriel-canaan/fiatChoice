import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    // const responseArray = this.state.response.data
    // const responseParsed = JSON.parse(responseArray)
    
 
   return (
      <div style={{ textAlign: "center" }}>
       {response
         ? <li key='dave'>
              {response}
           </li>
         : <p>Loading...</p>
        }
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





 