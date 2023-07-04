import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css"
import close from "./assets/close.svg"

const Close = ({ onClick }) => {
  return (
    <img src={close} alt="modal-close" onClick={onClick} className="modal-close" />
  )
}

export const Modal = (props) => {
  const { show, onClose, header, footer } = props;

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
        <Close onClick={onClose}/>

        {header && <div className="modal-header"><h4>{header}</h4></div>}

        <div className="modal-body">
          {props.children}
        </div>

        {footer && <div className="modal-footer">{footer}</div>}

      </div>
    </div>, document.getElementById('root')
  )
}
