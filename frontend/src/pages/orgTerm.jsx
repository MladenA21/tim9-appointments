import React from "react";

const orgTerm = (props) => {
    return(
        <tr>
            <td scope={"col"}>{props.term.name}</td>
        </tr>
    );
}

export default orgTerm;