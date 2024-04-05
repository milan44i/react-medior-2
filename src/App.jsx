import { useReducer, useRef } from 'react'
import './App.css'
import MarbleBox from './components/MarbleBox';

function App() {
  const [boxList, boxListDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_BOX':
        return [...state, { id: state.length, count: 0 }];
      case 'DELETE_BOX':
        return state.filter((_, i) => i !== action.index);
      case 'INCREMENT_COUNT':
        return state.map((box, i) => i === action.index ? { ...box, count: box.count + 1 } : box);
      case 'DECREMENT_COUNT':
        return state.map((box, i) => i === action.index ? { ...box, count: box.count > 0 ? box.count - 1 : 0 } : box);
      default:
        return state;
    }}, []);

  let marblesCount = boxList.reduce((acc, box) => acc + box.count, 0);

  const addNewBox = () =>  {
    boxListDispatch({ type: 'ADD_BOX' });
  }

  const deleteBox = (index) => {
    boxListDispatch({ type: 'DELETE_BOX', index });
  }

  let interval = useRef(null);
  let timer = useRef(null);

  const incrementCount = (index) => {
    boxListDispatch({ type: 'INCREMENT_COUNT', index });
    if (interval.current) return;
    timer.current = setTimeout(() => {
      interval.current = setInterval(() => {
        boxListDispatch({ type: 'INCREMENT_COUNT', index });
      }, 100);
    }, 500);
  }

  const decrementCount = (index) => {
    boxListDispatch({ type: 'DECREMENT_COUNT', index });
    if (interval.current) return;
    timer.current = setTimeout(() => {
      interval.current = setInterval(() => {
        boxListDispatch({ type: 'DECREMENT_COUNT', index });
      }, 100);
    }, 500);
  }

  const stopInterval = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  return (
    <>
      <div className='flex flex-col items-start gap-2 pb-2 border-b-2 w-52 mb-4'>
        <p> Boxes count: { boxList.length } </p> 
        <p> Marbles count: { marblesCount } </p> 
        <button className='w-full hover:bg-slate-400 border-0 transition-all' onClick={addNewBox}>ADD NEW BOX</button>
      </div>

      {boxList.length === 0 && <p> <i> No marble boxes, yet. </i> </p>}
      {boxList.length > 0 && <div>
        {boxList.map((box, index) => (
          <MarbleBox 
          key={box.id}
          count={box.count} 
          deleteBox={() => deleteBox(index)} 
          incrementCount={() => incrementCount(index)}
          stopInterval={stopInterval}
          decrementCount={() => decrementCount(index)}/> 
        ))}
      </div>}
    </>
  )
}

export default App;
