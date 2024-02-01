import { useState } from "react";
import { NavLink } from "react-router-dom";

/*
this is a component I'm experimenting with. It has not been implemented yet. 
It will be needed when I create a multi-level dropdown menu for navigating through
different product and sub-product categories.
*/

const MultiLevelMenu = ({ children, name, id }) => {

    const [toggle, setToggle] = useState(false);

    const divStyle = {
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid black',
        borderRadius: '10px',
    };

    function toggleChildren(e) {

        e.stopPropagation();
            
        toggle ? setToggle(false) : setToggle(true)

    }

    return (

        <div id={id} style={divStyle} onClick = {toggleChildren}>
            {name}
            {toggle &&  children.map((menuItem) => (
                <MultiLevelMenu key={menuItem.id} children={menuItem.children} name={menuItem.name} id={menuItem.id} />
            )) }
        </div>
    )
}

export default MultiLevelMenu;