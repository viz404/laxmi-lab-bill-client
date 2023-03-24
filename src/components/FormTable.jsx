import {
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";

const FormTable = ({ name, phone, area, address, setter }) => {
  return (
    <TableContainer borderWidth={2} borderRadius={10}>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Th>
              <Heading as="h5" size="sm">
                Name
              </Heading>
            </Th>
            <Td>
              <Input
                placeholder="Enter name"
                value={name}
                name="name"
                onChange={setter}
              />
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Heading as="h5" size="sm">
                Phone No
              </Heading>
            </Th>
            <Td>
              <Input
                placeholder="Enter Phone no"
                value={phone}
                name="phone"
                onChange={setter}
              />
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Heading as="h5" size="sm">
                Area
              </Heading>
            </Th>
            <Td>
              <Input
                placeholder="Enter area"
                value={area}
                name="area"
                onChange={setter}
              />
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Heading as="h5" size="sm">
                Address
              </Heading>
            </Th>
            <Td>
              <Input
                placeholder="Enter address"
                value={address}
                name="address"
                onChange={setter}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FormTable;
