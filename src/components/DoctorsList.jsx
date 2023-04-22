import react, { useState } from "react";
import {
  Box,
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
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import WorkPriceTable from "./WorkPriceTable";

import { useDispatch } from "react-redux";
import { deleteDoctorHelper } from "../reduxStore/doctor/doctorActions";

const DoctorsList = ({ doctors }) => {
  const [doctor, setDoctor] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const openDoctorModal = async (index) => {
    try {
      setSelectedIndex(index);
      onOpen();
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteDoctor = async (id) => {
    try {
      dispatch(deleteDoctorHelper(id, doctors[selectedIndex]?.name, toast));
      onClose();
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Something went wrong",
        description: `Couldn't delete the selected doctor`,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Table variant="striped">
        <Thead position="sticky" top={0} bg="white">
          <Tr>
            <Th>
              <Heading as="h5" size="sm">
                Name
              </Heading>
            </Th>
            <Th>
              <Heading as="h5" size="sm">
                Phone no
              </Heading>
            </Th>
            <Th>
              <Heading as="h5" size="sm">
                Area
              </Heading>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {doctors.map((el, index) => (
            <Tr
              key={el._id}
              cursor="pointer"
              onClick={() => openDoctorModal(index)}
            >
              <Td borderRightWidth={1}>{el.name}</Td>
              <Td borderRightWidth={1}>{el.phone}</Td>
              <Td>{el.area}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={10}>
              <Table variant="striped">
                <Tbody>
                  <Tr>
                    <Th fontSize="md">Name</Th>
                    <Td>{doctors[selectedIndex]?.name}</Td>
                  </Tr>
                  <Tr>
                    <Th fontSize="md">Contact</Th>
                    <Td>{doctors[selectedIndex]?.phone}</Td>
                  </Tr>
                  <Tr>
                    <Th fontSize="md">Area</Th>
                    <Td>{doctors[selectedIndex]?.area}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
            <Box marginTop={5}>
              <WorkPriceTable
                typeOfWorks={doctors[selectedIndex]?.typeOfWorks}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Link to={`/addDoctor/${doctors[selectedIndex]?._id}`}>
              <Button colorScheme="yellow" mr={3}>
                <EditIcon />
              </Button>
            </Link>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => deleteDoctor(doctors[selectedIndex]?._id)}
            >
              <DeleteIcon />
            </Button>
            <Link to={`/generateBill/${doctors[selectedIndex]?._id}`}>
              <Button colorScheme="blue" mr={3}>
                Generate Bill
              </Button>
            </Link>
            <Link to={`/addJob/${doctors[selectedIndex]?._id}`}>
              <Button colorScheme="blue" mr={3}>
                Add Job
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DoctorsList;
