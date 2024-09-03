import "./DropDownElement.css";

export default function DropDownElement({ element }: { element: string }) {
    return (
        <li className="dropDownElement">
            {element}
        </li>
    );
}
