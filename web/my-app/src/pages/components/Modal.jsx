function Modal(props) {

    let modalSize = 'modal-dialog'

    if (props.modalSize) {
        modalSize += ' ' + props.modalSize;
    }
    return (
        <div>
            <div className="modal" id={props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={modalSize}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                            <button type="button" id="btnModalClose" className="btn-close btnClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;