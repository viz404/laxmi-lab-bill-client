import {
  Box,
  Button,
  Flex,
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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import calculatePrice from "../calculationHelpers/calculatePrice";
import JobWorkSelector from "./JobWorkSelector";

const AddJob = ({ isOpen, onClose, addJob, doctor }) => {
  const [job, setJob] = useState({
    date: "",
    jobNo: "",
    patientName: "",
  });
  const [works, setWorks] = useState([]);
  const [display, setDisplay] = useState({
    topLeft: [],
    topRight: [],
    bottomLeft: [],
    bottomRight: [],
  });
  const [price, setPrice] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (!isOpen) {
      clearState();
    }
  }, [isOpen]);

  const clearState = () => {
    setJob({
      date: "",
      jobNo: "",
      patientName: "",
    });
    setWorks([]);
    setDisplay({
      topLeft: [],
      topRight: [],
      bottomLeft: [],
      bottomRight: [],
    });
  };

  const updateJob = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    job[name] = value;
    setJob({ ...job });
  };

  const selectTypeOfWork = (event) => {
    const title = event.target.name;
    const status = event.target.checked;
    let filteredWorks = [];

    if (status) {
      filteredWorks = [...works, { title }];
    } else {
      filteredWorks = works.filter((e) => e.title != title);
    }

    setWorks([...filteredWorks]);
  };

  const updateWork = (event) => {
    const name = event.target.name;
    const title = event.target.dataset.work;
    const worksIndex = event.target.dataset.index;
    const value = event.target.value;

    works[worksIndex][name] = value;

    let tempTopLeft = [];
    let tempTopRight = [];
    let tempBottomLeft = [];
    let tempBottomRight = [];

    for (let work of works) {
      if (work.topLeft) {
        tempTopLeft = [...tempTopLeft, ...work.topLeft.split(",").map(Number)];
      }

      if (work.topRight) {
        tempTopRight = [
          ...tempTopRight,
          ...work.topRight.split(",").map(Number),
        ];
      }

      if (work.bottomLeft) {
        tempBottomLeft = [
          ...tempBottomLeft,
          ...work.bottomLeft.split(",").map(Number),
        ];
      }

      if (work.bottomRight) {
        tempBottomRight = [
          ...tempBottomRight,
          ...work.bottomRight.split(",").map(Number),
        ];
      }
    }

    setPrice(calculatePrice(works, doctor.typeOfWorks));

    display.topLeft = tempTopLeft;
    display.topRight = tempTopRight;
    display.bottomLeft = tempBottomLeft;
    display.bottomRight = tempBottomRight;

    setDisplay({ ...display });
  };

  const handleSubmit = () => {
    let missing = [];

    if (job.date == "") {
      missing.push("Date");
    }

    if (job.jobNo == "") {
      missing.push("Job no");
    }

    if (job.patientName == "") {
      missing.push("Patient name");
    }

    if (works.length == 0) {
      missing.push("Work");
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
      job.jobNo = Number(job.jobNo);

      for (let work of works) {
        if (work.topLeft && work.topLeft == "") {
          delete work.topLeft;
        }

        if (work.topRight && work.topRight == "") {
          delete work.topRight;
        }

        if (work.bottomLeft && work.bottomLeft == "") {
          delete work.bottomLeft;
        }

        if (work.bottomRight && work.bottomRight == "") {
          delete work.bottomRight;
        }
      }

      let jobObj = {
        ...job,
        works,
        price,
      };

      addJob(jobObj);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Total Price: ₹{price}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={10}>
            <Table>
              <Tbody>
                <Tr>
                  <Th>
                    <Text fontSize="md">Date</Text>
                  </Th>
                  <Td>
                    <Input name="date" type="date" onChange={updateJob} />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Job No</Text>
                  </Th>
                  <Td>
                    <Input
                      name="jobNo"
                      type="number"
                      placeholder="Enter job number"
                      onChange={updateJob}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Name</Text>
                  </Th>
                  <Td>
                    <Input
                      name="patientName"
                      placeholder="Enter patient name"
                      onChange={updateJob}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Work Types</Text>
                  </Th>
                  <Td>
                    <Text></Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table width="30vw">
              <Tbody>
                <Tr>
                  <Td
                    padding={0}
                    borderRightWidth={1}
                    borderColor="blackAlpha.500"
                    paddingRight={1}
                  >
                    <Text textAlign="center" fontWeight="bold">
                      {display.topLeft.join(", ")}
                    </Text>
                  </Td>
                  <Td
                    padding={0}
                    borderBottomWidth={1}
                    borderColor="blackAlpha.500"
                    paddingLeft={1}
                  >
                    <Text textAlign="center" fontWeight="bold">
                      {display.topRight.join(", ")}
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
                    <Text textAlign="center" fontWeight="bold">
                      {display.bottomLeft.join(", ")}
                    </Text>
                  </Td>
                  <Td padding={0} borderBottomWidth={0} paddingLeft={1}>
                    <Text textAlign="center" fontWeight="bold">
                      {display.bottomRight.join(", ")}
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
          <Flex
            marginTop={5}
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <JobWorkSelector
              typeOfWorks={doctor.typeOfWorks}
              selectTypeOfWork={selectTypeOfWork}
            />
            <Flex
              direction="column"
              gap={5}
              maxHeight="30vh"
              overflowY="auto"
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
              {works.map((el, index) => (
                <Box key={index} borderWidth={2} borderRadius={10}>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th colSpan={2} textAlign="center">
                          <Text fontSize="md">{el.title}</Text>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>
                          <Input
                            name="topLeft"
                            data-work={el.title}
                            data-index={index}
                            borderColor="blackAlpha.500"
                            placeholder="Upper Left"
                            onChange={updateWork}
                          />
                        </Td>
                        <Td>
                          <Input
                            borderColor="blackAlpha.500"
                            placeholder="Upper Right"
                            name="topRight"
                            data-work={el.title}
                            data-index={index}
                            onChange={updateWork}
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Input
                            borderColor="blackAlpha.500"
                            placeholder="Lower Left"
                            name="bottomLeft"
                            data-work={el.title}
                            data-index={index}
                            onChange={updateWork}
                          />
                        </Td>
                        <Td>
                          <Input
                            borderColor="blackAlpha.500"
                            placeholder="Lower Right"
                            name="bottomRight"
                            data-work={el.title}
                            data-index={index}
                            onChange={updateWork}
                          />
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              ))}
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddJob;
