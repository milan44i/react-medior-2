import HoldButton from "./HoldButton";

export default function MarbleBox({ count, deleteBox, decrementCount, incrementCount, stopInterval}) {
  
  return (
    <div className='flex items-center justify-between my-2'>
      <HoldButton onMouseDown={decrementCount} onMouseUp={stopInterval}> - </HoldButton>
      <div> { count } </div>
      <HoldButton onMouseDown={incrementCount} onMouseUp={stopInterval} > + </HoldButton>
      <button onClick={deleteBox}> X </button>
    </div>  
  )
}