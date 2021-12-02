import { useCallback } from "react";
import { useTheme } from "styled-components";
import { space } from "styled-system";

import { Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { Table } from "@/common/components/atoms/Table";
import { Follower } from "@/community/types/community";

interface IProps {
  data?: Follower[];
  loading: boolean;
  error?: unknown;
}

export default function CreatorFollowerTable({ data }: IProps): JSX.Element {
  const { colors, space } = useTheme();

  const columns = [
    {
      Header: "Name",
      id: "name",
      accessor: "profile_detail.name",
    },
    {
      Header: "Email",
      id: "email",
      accessor: "profile_detail.email",
    },
    {
      Header: "Phone Number",
      id: "phone",
      accessor: "profile_detail.phone_number",
    },
  ];

  const getValue = useCallback((accessor: string, data: Follower) => {
    const split = accessor.split(".");

    return split.reduce((prev, curr) => {
      return prev[curr];
    }, data);
  }, []);

  return (
    <Box px={space.s}>
      <Table>
        <thead
          style={{
            textAlign: "left",
          }}
        >
          <tr>
            {columns.map((column) => (
              <th
                style={{
                  width: "50px",
                  padding: "12px",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  border: `1px solid ${colors.black[6]}`,
                  backgroundColor: colors.black[1],
                }}
                key={column.id}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody
          style={{
            textAlign: "left",
          }}
        >
          {(() => {
            if (!data) {
              return <Spinner />;
            }

            return data.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map((column) => {
                    return (
                      <td
                        style={{
                          padding: "14px",
                          fontSize: "14px",
                          fontWeight: 300,
                          border: `1px solid ${colors.black[6]}`,
                        }}
                        key={column.id}
                      >
                        {getValue(column.accessor, row)}
                      </td>
                    );
                  })}
                </tr>
              );
            });
          })()}
        </tbody>
      </Table>
    </Box>
  );
}
