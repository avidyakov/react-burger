import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {useDrag, useDrop} from 'react-dnd';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';

const DraggableConstructorElement = ({ingredient, index, handleRemove, handleMove}) => {
    const ref = useRef(null);
    const dragRef = useRef(null);

    const [{isDragging}, drag] = useDrag({
        type: 'constructor-element',
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{handlerId}, drop] = useDrop({
        accept: 'constructor-element',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            handleMove(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    drop(ref);
    drag(dragRef);

    return (
        <div
            ref={ref}
            className={`${styles.element} mb-4`}
            style={{opacity: isDragging ? 0.5 : 1}}
            data-handler-id={handlerId}
        >
            <div ref={dragRef} className={styles.drag}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleRemove(ingredient.uuid)}
            />
        </div>
    );
};

DraggableConstructorElement.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleMove: PropTypes.func.isRequired
};

export default DraggableConstructorElement;