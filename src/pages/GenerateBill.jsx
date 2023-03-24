import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import fetchDoctorById from "../apiHelpers/fetchDoctorById";
import AddJob from "../components/AddJob";
import { addBillHelper } from "../reduxStore/bill/billActions";

const GenerateBill = () => {
  const [doctor, setDoctor] = useState({});
  const [jobs, setJobs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [date, setDate] = useState({});

  const { doctorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  useEffect(() => {
    fetchDoctorById(doctorId)
      .then(({ data }) => {
        setDoctor({ ...data.response });
      })
      .catch((error) => {
        console.error(error.message);
        toast({
          title: "Something went wrong",
          description: error.message,
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const handlePrint = () => {
    let missing = [];

    if (jobs.length == 0) {
      missing.push("Jobs");
    }

    if (!date.fromDate) {
      missing.push("From Date");
    }

    if (!date.tillDate) {
      missing.push("Till Date");
    }

    if (missing.length > 0) {
      toast({
        title: "Incomplete information",
        description: missing.join(", "),
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      let currDate = new Date();
      currDate = currDate.toISOString().split("T").shift();

      const totalAmount = jobs.reduce((prev, curr) => prev + curr.price, 0);

      const billObj = {
        doctorId,
        doctorName: doctor.name,
        doctorAddress: doctor.address,
        createdAt: currDate,
        fromDate: date.fromDate,
        tillDate: date.tillDate,
        totalAmount,
        jobs,
      };

      dispatch(addBillHelper(billObj, toast, navigate));
    }
  };

  const deleteJob = () => {
    let filtered = jobs.filter((_, i) => i != selectedIndex);
    setJobs([...filtered]);
    onCloseDelete();
  };

  return (
    <Box padding={3}>
      <Flex alignItems="center" gap={7}>
        <Button colorScheme="blue" onClick={onOpen}>
          ADD
        </Button>
        <Button colorScheme="yellow" onClick={handlePrint}>
          Print
        </Button>
        <Flex alignItems="center" gap={3}>
          <Text>
            <nobr>From Date:</nobr>
          </Text>
          <Input
            type="date"
            onChange={(e) => {
              date.fromDate = e.target.value;
              setDate({ ...date });
            }}
          />
        </Flex>
        <Flex alignItems="center" gap={3}>
          <Text>
            <nobr>Till Date:</nobr>
          </Text>
          <Input
            type="date"
            onChange={(e) => {
              date.tillDate = e.target.value;
              setDate({ ...date });
            }}
          />
        </Flex>
        <Heading as="h4" size="md">
          Doctor: {doctor.name}
        </Heading>
        <Heading as="h4" size="md">
          Total Amount: ₹{jobs.reduce((prev, curr) => prev + curr.price, 0)}
        </Heading>
      </Flex>
      <AddJob
        isOpen={isOpen}
        onClose={onClose}
        addJob={addJob}
        doctor={doctor}
      />
      <Table marginTop={5} borderWidth={1}>
        <Thead position="sticky" top={0} bg="white">
          <Tr>
            <Th borderRightWidth={1}>
              <Heading as="h5" size="sm">
                Date
              </Heading>
            </Th>
            <Th borderRightWidth={1}>
              <Heading as="h5" size="sm">
                Job No
              </Heading>
            </Th>
            <Th borderRightWidth={1}>
              <Heading as="h5" size="sm">
                Patient Name
              </Heading>
            </Th>
            <Th borderRightWidth={1}>
              <Heading as="h5" size="sm">
                Type of work
              </Heading>
            </Th>
            <Th borderRightWidth={1}>
              <Heading as="h5" size="sm">
                Description
              </Heading>
            </Th>
            <Th>
              <Heading as="h5" size="sm">
                Amount
              </Heading>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobs.map((el, index) => (
            <Tr
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                onOpenDelete();
              }}
            >
              <Td borderRightWidth={1}>{el.date}</Td>
              <Td borderRightWidth={1}>{el.jobNo}</Td>
              <Td borderRightWidth={1}>{el.patientName}</Td>
              <Td borderRightWidth={1}>
                {el.works.map((e) => e.title).join(", ")}
              </Td>
              <Td borderRightWidth={1}>
                <Flex direction="column" gap={3}>
                  {el.works.map((ele) => (
                    <Flex justifyContent="space-between" key={ele.title}>
                      <Text>{ele.title}</Text>
                      <Table width="fit-content">
                        <Tbody>
                          <Tr>
                            <Td
                              padding={0}
                              borderRightWidth={1}
                              borderColor="blackAlpha.500"
                              paddingRight={1}
                            >
                              <Text> {ele.topLeft}</Text>
                            </Td>
                            <Td
                              padding={0}
                              borderBottomWidth={1}
                              borderColor="blackAlpha.500"
                              paddingLeft={1}
                            >
                              <Text> {ele.topRight}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td
                              padding={0}
                              borderRightWidth={1}
                              borderColor="blackAlpha.500"
                              borderBottomWidth={0}
                              paddingRight={1}
                            >
                              <Text>{ele.bottomLeft}</Text>
                            </Td>
                            <Td
                              padding={0}
                              borderBottomWidth={0}
                              paddingLeft={1}
                            >
                              <Text>{ele.bottomRight}</Text>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </Flex>
                  ))}
                </Flex>
              </Td>
              <Td>₹ {el.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Proceed to delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> Are you sure you want to delete ?</Text>
            <Text>Patient name: {jobs[selectedIndex]?.patientName}</Text>
            <Text>Job No: {jobs[selectedIndex]?.jobNo}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteJob}>
              Delete
            </Button>
            <Button colorScheme="yellow" onClick={onCloseDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GenerateBill;
