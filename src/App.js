import './App.css';
import Tile from './Tile';
import { useEffect, createRef, useState } from 'react'

function App() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const [elementRefs, setElementsRef] = useState([]);
  const [tileArray, setTileArray] = useState([]);
  const [selected, setSelected] = useState([]);
  const [prevselected, setPrevSelected] = useState('');
  const [count, setCount] = useState(0);

  function changeColors(array, currindex, randomIndex) {
    const temp = array[currindex];
    array[currindex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  function randomArrayGenerator(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      changeColors(array, currentIndex, randomIndex)
    }
    return array;
  }

  const flipCard = (index, color) => {
    elementRefs[index].current.className += ` ${color}`
    if (selected.length < 1) {
      setSelected(selected.push(color));
      setPrevSelected(index)
    } else {
      if (![...elementRefs[prevselected].current.classList].includes(color)) {
        setTimeout(() => {
          elementRefs[prevselected].current.className = 'tile';
          elementRefs[index].current.className = 'tile';
        }, 1000);
      } else {
        setCount(count + 1);
      }
      setSelected([])
      setPrevSelected('')
    }
  }

  const restartGame = () => {
    setTileArray(randomArrayGenerator(colors.concat(colors)))
    elementRefs.forEach((ref, i) => {
      ref.current.className = 'tile';
    })
    setCount(0);
  }

  useEffect(() => {
    setTileArray(randomArrayGenerator(colors.concat(colors)))
  }, [])

  useEffect(() => {
    setElementsRef((refernce) => {
      return tileArray?.map((_, index) => refernce[index] || createRef())
    })
  }, [tileArray])

  return (
    <div className="App">
      <h1>{count !== 4 ? 'Memory' : 'You Win!'}</h1>
      <div className='board'>
        {
          tileArray.map((color, i) => {
            return <Tile key={i} nodeIndex={i} reference={elementRefs?.[i]} classes={color} handleClick={flipCard} />
          })
        }
      </div>
      {
        count === 4 &&
        <button onClick={restartGame}>Restart</button>
      }
    </div>
  );
}

export default App;
