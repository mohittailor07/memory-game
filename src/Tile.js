import './App.css';

function Tile(props) {
    console.log(props)
    return (
        <div ref={props.reference} className={`tile`} onClick={() => props.handleClick(props.nodeIndex, props.classes)}>

        </div>
    );
}

export default Tile;
