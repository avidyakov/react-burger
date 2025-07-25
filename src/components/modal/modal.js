import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';

const modalPlace = document.getElementById('modal-root') || document.createElement('div');

if (!document.getElementById('modal-root')) {
    modalPlace.setAttribute('id', 'modal-root');
    document.body.appendChild(modalPlace);
}

const Modal = ({title, onClose, children}) => {
    useEffect(() => {
        const escFunction = (evt) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', escFunction);

        return () => {
            document.removeEventListener('keydown', escFunction);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose}/>
            <div className={styles.modal} data-test="modal">
                <div className={styles.header}>
                    <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
                    <button className={styles.closeBtn} onClick={onClose} data-test="close-modal">
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                <div className={styles.stuff}>
                    {children}
                </div>
            </div>
        </>,
        modalPlace
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;
