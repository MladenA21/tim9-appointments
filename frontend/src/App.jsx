import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Reservation from "./pages/Reservation";
import AddReservation from "./pages/AddReservation";
import Repository from "./repository/Repository";
import {Component} from "react";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: []
        }
    }

    render() {
        return (
            <Routes>
                <Route path="/" element={<Home organizations={this.state.organizations}/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/reserve" element={<AddReservation />} />
            </Routes>
        )
    }

    componentDidMount() {
        this.loadOrganizations();
    }


    loadOrganizations = () => {
      Repository.fetchOrganizations()
          .then((data) => {
              console.log("Podatoci")
              console.log(data)
              this.setState({
                  organizations: data.data
              })
            });
    }
}


export default App
