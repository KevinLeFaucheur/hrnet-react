// export const Modal = () => {
//   return (
//     <dialog id="confirmation" className="modal">
//       Employee Created!
//       <a 
//         aria-label="Close"
//         onClick={() => document.getElementById('confirmation').close()} 
//         href="#close-modal" 
//         rel="modal:close" 
//         className="close-modal">
//           <i className="fa-solid fa-circle-xmark" aria-hidden="true" />
//       </a>
//     </dialog>
//   )
// }
import "./Modal.css"

export const Modal = (props) => {
  if(!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Title</h4>
        </div>
        <div className="modal-body">
          Employee Created!
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="modal-close">Close</button>
        </div>
      </div>
    </div>
  )
}
