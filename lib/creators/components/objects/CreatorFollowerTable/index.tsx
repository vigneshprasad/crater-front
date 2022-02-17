import { useCallback } from "react";
import styled, { useTheme } from "styled-components";

import { Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import { Follower } from "@/community/types/community";

interface IProps {
  data?: Follower[];
  loading: boolean;
  error?: unknown;
  onPressDownloadCSV: () => void;
}

const Table = styled.table`
  width: 100%;
`;
const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.black[1]};
`;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th`
  padding: ${({ theme }) => theme.space.xxs}px;
  text-align: left;
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.space.xxs}px;
  text-align: left;
`;

export default function CreatorFollowerTable({
  data,
  loading,
  onPressDownloadCSV,
}: IProps): JSX.Element {
  const { space } = useTheme();

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
    <>
      <Table>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.id}>
                <Text textStyle="placeholder">{column.Header}</Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            if (!data || loading) {
              return <Spinner />;
            }

            return data.map((row) => {
              return (
                <Tr key={row.id}>
                  {columns.map((column) => (
                    <Td key={column.id}>
                      <Text>{getValue(column.accessor, row)}</Text>
                    </Td>
                  ))}
                </Tr>
              );
            });
          })()}
        </Tbody>
      </Table>
      <Button
        ml="auto"
        mr={0}
        my={space.xxxs}
        text="Download CSV"
        onClick={onPressDownloadCSV}
      />
    </>
  );
}
