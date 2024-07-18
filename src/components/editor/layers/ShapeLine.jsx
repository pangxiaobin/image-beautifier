import { useEffect, useMemo } from 'react';
import { Rect, Ellipse, Line, Text } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow';

export default ({ parent, type, id, width, height, x, y, fill, strokeWidth, zIndex, points, editable, text }) => {
    const shape = useMemo(() => {
        const defaultOption = { id, x, y, zIndex }
        if (type === 'SquareFill') {
            return new Rect({
                cornerRadius: 8,
                width,
                height,
                fill,
                ...defaultOption
            });
        }
        if (type === 'Circle') {
            return new Ellipse({
                stroke: fill,
                strokeWidth,
                width,
                height,
                ...defaultOption
            });
        }
        if (type === 'Slash') {
            return new Line({
                id,
                points,
                zIndex,
                stroke: fill,
                strokeWidth
            });
        }
        if (type === 'MoveDownLeft') {
            return new Arrow({
                id,
                points,
                zIndex,
                strokeCap: 'round',
                strokeJoin: 'round',
                stroke: fill,
                strokeWidth
            });
        }
        if (type === 'Pencil') {
            return new Line({
                id,
                points,
                zIndex,
                curve: true,
                stroke: fill,
                strokeWidth
            });
        }
        if (type === 'emoji') {
            return new Text({
                id,
                zIndex,
                text,
                resizeFontSize: true,
                fontSize: 48
            });
        }
        return new Rect({
            cornerRadius: 8,
            stroke: fill,
            strokeWidth,
            width,
            height,
            ...defaultOption
        });
    }, [parent]);

    useEffect(() => {
        if (['Slash', 'MoveDownLeft', 'Pencil'].includes(type)) {
            shape.points = points;
        } else {
            shape.x = x;
            shape.y = y;
            shape.width = width;
            shape.height = height;
        }
    }, [x, y, width, height]);

    useEffect(() => {
        shape.editable = !!editable;
    }, [editable]);

    useEffect(() => {
        parent.add(shape);
        return (() => {
            shape.remove();
        })
    }, [parent]);
    return null;
}