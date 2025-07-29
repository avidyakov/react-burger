import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {useDrop} from 'react-dnd';
import styles from './burgerconstructor.module.css';

const DroppableConstructor = ({children, onDrop}) => {
    const ref = useRef(null);

    const [{isOver}, drop] = useDrop({
        accept: 'ingredient',
        drop: (item) => {
            onDrop(item.ingredient);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    drop(ref);

    return (
        <div
            ref={ref}
            className={styles.box}
            style={{
                backgroundColor: isOver ? 'rgba(51, 51, 255, 0.1)' : 'transparent',
                transition: 'background-color 0.3s'
            }}
        >
            {children}
        </div>
    );
};

DroppableConstructor.propTypes = {
    children: PropTypes.node.isRequired,
    onDrop: PropTypes.func.isRequired
};

export default DroppableConstructor;