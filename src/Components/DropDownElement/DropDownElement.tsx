import { DropDownElementPropType } from "../../types";
import "./DropDownElement.css";

export default function DropDownElement({ element }: DropDownElementPropType) {
    return (
        <li className="dropDownElement" >
            {element}
        </li >
    );
}
