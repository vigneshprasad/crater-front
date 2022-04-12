import { useMemo } from "react";
import styled from "styled-components";

import { Box } from "@/common/components/atoms";

import { Text } from "../../atoms/System/Text";
import { Column, Row } from "./types";

interface IDataTableProps<P> {
  data?: P[];
  columns: Column<P>[];
  onClickRow?: (row: P) => void;
}

const TableStyles = styled(Box)`
  /* This will make the table scrollable when it gets too small */
  display: block;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

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

    tbody tr {
      transition: background 200ms ease-in-out;
    }

    tbody tr:hover {
      background: ${({ theme }) => theme.colors.black[1]};
    }

    th,
    td {
      margin: 0;
      vertical-align: middle;
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

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;

    table {
      border-spacing: 0;
      border-top: 1px solid ${({ theme }) => theme.borders.main};
    }
  }
`;

export default function DataTable<T>({
  data,
  columns,
  onClickRow,
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
                <Text textStyle="tableHeader">{heading}</Text>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(({ key, cells }, index) => (
            <tr
              key={key}
              onClick={
                onClickRow ? () => onClickRow(data?.[index] as T) : undefined
              }
              style={{
                cursor: onClickRow ? "pointer" : "default",
              }}
            >
              {cells.map((cell) => {
                return (
                  <td key={cell.key}>
                    <Text>{cell.value}</Text>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </TableStyles>
  );
}
