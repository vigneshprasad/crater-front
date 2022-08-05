import { useCallback } from "react";
import styled, { useTheme } from "styled-components";

import { Text } from "@/common/components/atoms";
import { Follower } from "@/community/types/community";

interface IProps {
  data: Follower[];
  error?: unknown;
}

const Table = styled.table`
  width: 100%;
`;
const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.primaryLight};
`;
const Tbody = styled.tbody``;
const Tr = styled.tr`
  background: ${({ theme }) => theme.colors.primaryDark};

  :nth-child(even) {
    background: ${({ theme }) => theme.colors.primaryBackground};
  }
`;
const Th = styled.th`
  padding: 14px 24px;
  text-align: left;
`;

const Td = styled.td`
  padding: 18px 24px;
  text-align: left;
`;

export default function CreatorFollowerTable({ data }: IProps): JSX.Element {
  const { colors } = useTheme();
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
      // @ts-expect-error: cant know type as its dynamic
      return prev[curr];
    }, data);
  }, []);

  return (
    <Table>
      <Thead>
        {columns.map((column) => (
          <Th key={column.id}>
            <Text
              textStyle="small"
              fontWeight={600}
              color={colors.textTertiary}
              textTransform="uppercase"
            >
              {column.Header}
            </Text>
          </Th>
        ))}
      </Thead>
      <Tbody>
        {data.map((row) => {
          return (
            <Tr key={row.id}>
              {columns.map((column) => (
                <Td key={column.id}>
                  <Text textStyle="body" fontWeight={600}>
                    {getValue(column.accessor, row)}
                  </Text>
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
