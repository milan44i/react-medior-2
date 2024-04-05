export default function HoldButton({ children, ...props }) {
  return (
    <button {...props}> {children} </button>
  )
}