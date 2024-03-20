import { Table } from '@mantine/core';

const TedyTable = ({ data }: any) => {
  const { header, body } = data;

  const headers = header.map((element: string) => <Table.Th key={element}>{element}</Table.Th>);

  const rows = body.map((element: any) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>{headers}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TedyTable;
