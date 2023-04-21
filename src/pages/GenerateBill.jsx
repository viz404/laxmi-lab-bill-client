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
import fetchJobsNoLimit from "../apiHelpers/fetchJobsNoLimit";
import fetchJobByNumber from "../apiHelpers/fetchJobByNumber";
import { addBillHelper } from "../reduxStore/bill/billActions";
import trimDate from "../calculationHelpers/trimDate";
import filterJobs from "../helperFunctions/filterJobs";

const GenerateBill = () => {
  const [doctor, setDoctor] = useState({});
  const [jobs, setJobs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [fromDate, setFromDate] = useState("");
  const [tillDate, setTillDate] = useState("");
  const [newJobNumber, setNewJobNumber] = useState("");

  const { doctorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const generateBill = async () => {
    try {
      let { data } = await fetchJobsNoLimit({
        doctor_id: doctorId,
        from_date: fromDate,
        till_date: tillDate,
      });

      // let filteredJobs = filterJobs(data.response);
      // setJobs([...filteredJobs]);
      setJobs([...data.response]);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePrint = () => {
    let missing = [];

    if (jobs.length == 0) {
      missing.push("No Jobs");
    }

    if (fromDate == "") {
      missing.push("From Date");
    }

    if (tillDate == "") {
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
      const totalAmount = jobs.reduce((prev, curr) => prev + curr.price, 0);

      const billObj = {
        doctor: doctorId,
        fromDate,
        tillDate,
        totalAmount,
        jobs: jobs.map((el) => el._id),
      };

      dispatch(addBillHelper(billObj, toast, navigate));
    }
  };

  const removeJob = () => {
    const removed = jobs.splice(selectedIndex, 1);
    setJobs([...jobs]);
    toast({
      title: "Removed",
      description: `Successfully removed job number ${removed[0].jobNumber}`,
      position: "top",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const addNewJob = async () => {
    try {
      let { data } = await fetchJobByNumber(newJobNumber);
      if (data.response) {
        setJobs([...jobs, ...data.response]);
      } else {
        toast({
          title: "Not found",
          description: "No jobs found matching the given number",
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Something went wrong",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setNewJobNumber("");
    }
  };

  return (
    <Box padding={3}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex direction="column" gap={3}>
          <Button
            colorScheme="yellow"
            onClick={handlePrint}
            isDisabled={jobs.length == 0}
          >
            Print
          </Button>
          <Button
            colorScheme="blue"
            onClick={generateBill}
            isDisabled={fromDate == "" || tillDate == ""}
          >
            Generate
          </Button>
        </Flex>
        <Flex direction="column" gap={3}>
          <Flex alignItems="center" gap={3}>
            <Text>
              <nobr>From Date:</nobr>
            </Text>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            />
          </Flex>
          <Flex alignItems="center" gap={3}>
            <Text>
              <nobr>Till Date:</nobr>
            </Text>
            <Input
              type="date"
              value={tillDate}
              onChange={(e) => {
                setTillDate(e.target.value);
              }}
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap={3}>
          <Heading as="h4" size="md">
            Doctor: {doctor.name}
          </Heading>
          <Heading as="h4" size="md">
            Total Amount: ₹{jobs.reduce((prev, curr) => prev + curr.price, 0)}
          </Heading>
        </Flex>
        <Flex gap={2} width="fit-content">
          <Button
            width="100%"
            colorScheme="green"
            isDisabled={newJobNumber == ""}
            onClick={addNewJob}
          >
            Add by JobNumber
          </Button>
          <Input
            placeholder="Enter Job number"
            value={newJobNumber}
            onChange={(e) => setNewJobNumber(e.target.value)}
          />
        </Flex>
      </Flex>
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
                onOpen();
              }}
            >
              <Td borderRightWidth={1}>{trimDate(el.date)}</Td>
              <Td borderRightWidth={1}>{el.jobNumber}</Td>
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
                              <Text> {ele.topLeft?.replaceAll(",", " ")}</Text>
                            </Td>
                            <Td
                              padding={0}
                              borderBottomWidth={1}
                              borderColor="blackAlpha.500"
                              paddingLeft={1}
                            >
                              <Text> {ele.topRight?.replaceAll(",", " ")}</Text>
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
                              <Text>
                                {ele.bottomLeft?.replaceAll(",", " ")}
                              </Text>
                            </Td>
                            <Td
                              padding={0}
                              borderBottomWidth={0}
                              paddingLeft={1}
                            >
                              <Text>
                                {ele.bottomRight?.replaceAll(",", " ")}
                              </Text>
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table>
              <Tbody>
                <Tr>
                  <Th>Job Number</Th>
                  <Td>{jobs[selectedIndex]?.jobNumber}</Td>
                </Tr>
                <Tr>
                  <Th>Patient Name</Th>
                  <Td>{jobs[selectedIndex]?.patientName}</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={removeJob}>
              Remove from bill
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GenerateBill;
