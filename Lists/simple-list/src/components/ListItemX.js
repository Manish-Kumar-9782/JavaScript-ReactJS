const ListItemX = ({ text, mark }) => {
    return (
        <li className="flex-row jc-between">
            <span className="inline-block">{text}</span>
            <span className="inline-block">{mark}</span>
        </li>
    );
};

export default ListItemX;