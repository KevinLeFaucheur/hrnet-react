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
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css"

export const Modal = (props) => {
  const { show, onClose } = props;

  const closeOnEscapeKeyDown = useCallback((e) => {
    if((e.charCode || e.keyCode) === 27) onClose();
  }, [onClose])

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
  }, [closeOnEscapeKeyDown])

  return createPortal(
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4>{props.title}</h4>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-close">Close</button>
        </div>
      </div>
    </div>, document.getElementById('root')
  )
}
