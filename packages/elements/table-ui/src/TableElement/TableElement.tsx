import * as React from 'react';
import { withProviders } from '@udecode/plate-common';
import { Provider } from 'jotai';
import { useTableColSizes } from '../hooks/useTableColSizes';
import { getTableElementStyles } from './TableElement.styles';
import { TableElementProps } from './TableElement.types';

const TableElementRaw = (props: TableElementProps) => {
  const {
    attributes,
    children,
    nodeProps,
    styles,
    element,
    classNames,
    prefixClassNames,
    transformColSizes,
    ...rootProps
  } = props;

  const { root, tbody } = getTableElementStyles(props);

  let colSizes = useTableColSizes(element);

  if (transformColSizes) {
    colSizes = transformColSizes(colSizes);
  }

  return (
    <table
      {...attributes}
      css={root.css}
      className={root.className}
      {...rootProps}
      {...nodeProps}
    >
      <colgroup>
        {colSizes.map((width, index) => (
          <col key={index} style={width ? { width } : undefined} />
        ))}
      </colgroup>
      <tbody css={tbody?.css} className={tbody?.className}>
        {children}
      </tbody>
    </table>
  );
};

export const TableElement = withProviders(Provider)(TableElementRaw);
