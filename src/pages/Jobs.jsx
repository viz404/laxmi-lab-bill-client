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
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import trimDate from "../calculationHelpers/trimDate";
import DoctorSelectorRadio from "../components/DoctorSelectorRadio";
import { deleteJobHelper, loadJobsHelper } from "../reduxStore/jobs/jobActions";

const Jobs = () => {
  const [page, setPage] = useState(1);
  const [doctor, setDoctor] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [tillDate, setTillDate] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");

  const { jobs, total } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(
      loadJobsHelper({
        toast,
        doctor_id: doctor._id || "",
        from_date: fromDate,
        till_date: tillDate,
        _limit: 20,
        _page: page,
      })
    );
  }, [doctor, fromDate, tillDate, page]);

  return (
    <Box paddingTop={5} paddingX={10}>
      <Flex justifyContent="space-between">
        <Flex alignItems="flex-start" direction="column" gap={10}>
          <DoctorSelectorRadio selectDoctor={setDoctor} initialIndex="" />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap={5}
            width="100%"
          >
            <Heading as="h5" size="sm">
              From
            </Heading>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            {fromDate != "" && (
              <Button onClick={() => setFromDate("")}>X</Button>
            )}
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap={5}
            width="100%"
          >
            <Heading as="h5" size="sm">
              To
            </Heading>
            <Input
              type="date"
              value={tillDate}
              onChange={(e) => setTillDate(e.target.value)}
            />
            {tillDate != "" && (
              <Button onClick={() => setTillDate("")}>X</Button>
            )}
          </Flex>
        </Flex>
        <Box>
          <Box
            margin="2rem 8rem"
            maxHeight="70vh"
            overflowY="auto"
            borderWidth={1}
            borderRadius={10}
            borderColor="grey"
            borderBottomWidth={0}
            scrollBehavior="smooth"
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                borderRadius: "10px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                backgroundColor: `rgba(0, 0, 0, 0.3)`,
              },
            }}
          >
            <Table>
              <Thead>
                <Tr>
                  <Th borderRightWidth={1} borderColor="grey">
                    <Heading as="h5" size="sm">
                      Date
                    </Heading>
                  </Th>
                  <Th borderRightWidth={1} borderColor="grey">
                    <Heading as="h5" size="sm">
                      Job No
                    </Heading>
                  </Th>
                  <Th borderRightWidth={1} borderColor="grey">
                    <Heading as="h5" size="sm">
                      Doctor Name
                    </Heading>
                  </Th>
                  <Th borderRightWidth={1} borderColor="grey">
                    <Heading as="h5" size="sm">
                      Patient Name
                    </Heading>
                  </Th>
                  <Th borderRightWidth={1} borderColor="grey">
                    <Heading as="h5" size="sm">
                      Type of work
                    </Heading>
                  </Th>
                  <Th borderRightWidth={1} borderBottomColor="grey">
                    <Heading as="h5" size="sm">
                      Description
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
                    <Td borderRightWidth={1} borderColor="grey">
                      {trimDate(el.date)}
                    </Td>
                    <Td borderRightWidth={1} borderColor="grey">
                      {el.jobNumber}
                    </Td>
                    <Td borderRightWidth={1} borderColor="grey">
                      {el.doctor?.name}
                    </Td>
                    <Td borderRightWidth={1} borderColor="grey">
                      {el.patientName}
                    </Td>
                    <Td borderRightWidth={1} borderColor="grey">
                      {el.works.map((e) => e.title).join(", ")}
                    </Td>
                    <Td borderRightWidth={1} borderBottomColor="grey">
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
                                    <Text>
                                      {ele.topLeft?.replaceAll(",", " ")}
                                    </Text>
                                  </Td>
                                  <Td
                                    padding={0}
                                    borderBottomWidth={1}
                                    borderColor="blackAlpha.500"
                                    paddingLeft={1}
                                  >
                                    <Text>
                                      {ele.topRight?.replaceAll(",", " ")}
                                    </Text>
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
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Flex
            justifyContent="space-between"
            width="70vw"
            margin="2rem auto"
            alignItems="center"
          >
            <Button
              colorScheme="blue"
              isDisabled={page == 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <Text>
              List: {page} of {Math.ceil(Number(total) / 20)}
            </Text>
            <Button
              colorScheme="blue"
              isDisabled={page == Math.ceil(Number(total) / 20)}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Flex>
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
            <Box borderWidth={1} borderRadius={10} overflow="hidden">
              <Table variant="striped" colorScheme="whatsapp">
                <Tbody>
                  <Tr>
                    <Th>
                      <Text fontSize="sm">Job Number</Text>
                    </Th>
                    <Td>{jobs[selectedIndex]?.jobNumber}</Td>
                  </Tr>
                  <Tr>
                    <Th>
                      <Text fontSize="sm">Patient Name</Text>
                    </Th>
                    <Td>{jobs[selectedIndex]?.patientName}</Td>
                  </Tr>
                  <Tr>
                    <Th>
                      <Text fontSize="sm">Doctor Name</Text>
                    </Th>
                    <Td>{jobs[selectedIndex]?.doctor.name}</Td>
                  </Tr>
                  {jobs[selectedIndex]?.shade && (
                    <Tr>
                      <Th>
                        <Text fontSize="sm">Shade</Text>
                      </Th>
                      <Td>{jobs[selectedIndex]?.shade}</Td>
                    </Tr>
                  )}
                  {jobs[selectedIndex]?.notes && (
                    <Tr>
                      <Th>
                        <Text fontSize="sm">Notes</Text>
                      </Th>
                      <Td>{jobs[selectedIndex]?.notes}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                dispatch(
                  deleteJobHelper({
                    id: jobs[selectedIndex]?._id,
                    number: jobs[selectedIndex]?.jobNumber,
                    toast,
                  })
                );
                onClose();
              }}
            >
              Delete
            </Button>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={() => {
                navigate(
                  `/addJob/${jobs[selectedIndex]?.doctor._id}/${jobs[selectedIndex]?._id}`
                );
              }}
            >
              Edit
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Jobs;
