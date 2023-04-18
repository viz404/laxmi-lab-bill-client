import react, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import DummyAvatar from "../components/DummyAvatar";
import WorkPriceTable from "./WorkPriceTable";

import fetchDoctorById from "../apiHelpers/fetchDoctorById";
import { useDispatch } from "react-redux";
import { deleteDoctorHelper } from "../reduxStore/doctor/doctorActions";

const DoctorsList = ({ doctors }) => {
  const [doctor, setDoctor] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const openDoctorModal = async (id) => {
    try {
      const { data } = await fetchDoctorById(id);
      setDoctor({ ...data.response });
      onOpen();
    } catch (error) {}
  };

  const deleteDoctor = async (id) => {
    try {
      dispatch(deleteDoctorHelper(id, doctor.name, toast));
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
          {doctors.map((el) => (
            <Tr
              key={el._id}
              cursor="pointer"
              onClick={() => openDoctorModal(el._id)}
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
              <DummyAvatar boxSize="100px" />
              <Flex direction="column" gap={3}>
                <Text>{doctor.name}</Text>
                <Text>{doctor.phone}</Text>
                <Text>{doctor.area}</Text>
              </Flex>
            </Flex>
            <Box marginTop={5}>
              <WorkPriceTable typeOfWorks={doctor.typeOfWorks} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Link to={`/addDoctor/${doctor._id}`}>
              <Button colorScheme="yellow" mr={3}>
                Edit
              </Button>
            </Link>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => deleteDoctor(doctor._id)}
            >
              Delete
            </Button>
            <Link to={`/generateBill/${doctor._id}`}>
              <Button colorScheme="blue" mr={3}>
                Generate Bill
              </Button>
            </Link>
            <Link to={`/addJob/${doctor._id}`}>
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
