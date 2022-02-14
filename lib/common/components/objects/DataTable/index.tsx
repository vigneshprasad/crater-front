import { useMemo } from "react";
import styled from "styled-components";

import { Box } from "@/common/components/atoms";

import { Text } from "../../atoms/System/Text";
import { Column, Row } from "./types";

interface IDataTableProps<P> {
  data?: P[];
  columns: Column<P>[];
}

const TableStyles = styled(Box)`
  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    border-spacing: 0;
    border-top: 1px solid ${({ theme }) => theme.borders.main};

    tr {
      border-bottom: 1px solid ${({ theme }) => theme.borders.main};
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    thead tr {
      text-align: left;
    }

    th,
    td {
      margin: 0;
      padding: ${({ theme }) => `${theme.space.xxs}px ${theme.space.xxs}px`};

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default function DataTable<T>({
  data,
  columns,
}: IDataTableProps<T>): JSX.Element {
  const headers: { heading: string; id: string }[] = useMemo(() => {
    return columns.map((col) => ({
      heading: col.label,
      id: col.key,
    }));
  }, [columns]);

  const rows: Row[] = useMemo(() => {
    if (!data) {
      return [] as Row[];
    }
    return data.map((obj, index) => ({
      key: `row__${index}`,
      cells: columns.map((col) => ({
        key: `cell__${col.key}`,
        value: col.valueGetter(obj),
      })),
    }));
  }, [data, columns]);

  return (
    <TableStyles>
      <table>
        <thead>
          <tr>
            {headers.map(({ heading, id }) => (
              <th key={id}>
                <Text>{heading}</Text>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(({ key, cells }) => (
            <tr key={key}>
              {cells.map((cell) => (
                <td key={cell.key}>
                  <Text>{cell.value}</Text>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableStyles>
  );
}
