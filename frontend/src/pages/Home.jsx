import logo from "../assets/logo.png";
import orgTerm from "./orgTerm"
import React from "react";


const Home = (props) => {
    //
    // constructor(props) {
    //     super(props);
    // }
    //
    // render() {
    //     const organizations = this.getOrganizations();

        return (
            <div>
                <div className="top-cont">
                    <div className="container text-center p-4">
                        <div className='container w-50 mx-auto'>
                            <div className='w-75 mx-auto' style={{ fontFamily: "Madimi One", color: "#6c596e", fontSize: "4rem" }}>
                                <img className='mx-3' src={logo} alt="logo" style={{ width: "70px" }} />
                                Reserfivy
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-stripped">
                                <thead>
                                <tr>
                                    <th scope={"col"}>Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {props.organizations.map((term) => {
                                    return (
                                        <tr>
                                            <td>{term.name}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>
        );
    }


    // getOrganizations = () => {
    //     return this.props.organizations.map((term) => {
    //         return (
    //             <orgTerm term={term}/>
    //         );
    //     });
    // }
// }


export default Home;
