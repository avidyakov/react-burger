import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const ModalOverlay = ({onClick}) => {
    return (
        <div className={styles.bg} onClick={onClick} data-test="modal-overlay"></div>
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ModalOverlay;
