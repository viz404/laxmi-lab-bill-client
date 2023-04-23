import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const AccountModal = ({ isOpen, onClose, doctorName, doctorId, balance }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Table>
            <Tbody>
              <Tr>
                <Th>Name</Th>
                <Td>{doctorName}</Td>
              </Tr>
              <Tr>
                <Th>Balance</Th>
                <Td>₹ {balance}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Flex margin="auto" gap={5}>
            <Link to={`/addPayment/${doctorId}`}>
              <Button colorScheme="yellow">Add Payment</Button>
            </Link>
            <Link to={`/statement/${doctorId}`}>
              <Button colorScheme="green">Show Statement</Button>
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccountModal;
