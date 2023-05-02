import {
  Box,
  Button,
  Flex,
  Input,
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
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import JobWorkSelector from "../components/JobWorkSelector";
import { addJobHandler, updateJobHandler } from "../reduxStore/jobs/jobActions";

import DummyAvatar from "../components/DummyAvatar";
import calculatePrice from "../calculationHelpers/calculatePrice";
import verifyEmptyWorks from "../helperFunctions/verifyEmptyWorks";
import fetchDoctorById from "../apiHelpers/fetchDoctorById";
import fetchJobById from "../apiHelpers/fetchJobById";

const ToothIcon = "https://cdn-icons-png.flaticon.com/512/5875/5875556.png";

const AddJob = () => {
  const [job, setJob] = useState({});
  const [works, setWorks] = useState([]);
  const [doctor, setDoctor] = useState({});

  const { doctorId, jobId } = useParams();

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (jobId) {
      fetchJobById(jobId).then(({ data: { response } }) => {
        let { _id, date, doctor, jobNumber, patientName, shade, notes, works } =
          response;

        let jobObj = {
          _id,
          date: date.split("T").shift(),
          jobNumber,
          patientName,
        };

        if (shade) {
          jobObj.shade = shade;
        }

        if (notes) {
          jobObj.notes = notes;
        }

        setJob(jobObj);
        setWorks([...works]);
        setDoctor(doctor);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    } else if (doctorId) {
      fetchDoctorById(doctorId).then(({ data: { response } }) => {
        setDoctor({ ...response });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    }
  }, [doctorId, jobId]);

  const selectWork = (event, element) => {
    const status = event.currentTarget.checked;

    if (status) {
      setWorks([
        ...works,
        {
          title: element.title,
          _id: element._id,
          singlePrice: element.price,
        },
      ]);
    } else {
      let filtered = works.filter((e) => e.title != element.title);
      setWorks([...filtered]);
    }
  };

  const updateWork = (event) => {
    const { id: index, name: position, value } = event.target;

    works[index][position] = value;

    if (value == "") {
      delete works[index][position];
    }

    setWorks([...works]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (works.length == 0 || verifyEmptyWorks(works)) {
        throw new Error("Please add some work");
      }

      let jobObj = {
        doctor: doctorId,
        price: calculatePrice(works),
        works,
        ...job,
      };

      if (jobId) {
        dispatch(updateJobHandler(jobObj, toast, navigate));
      } else {
        dispatch(addJobHandler(jobObj, toast, navigate));
      }
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

  const formSetter = (event) => {
    const { name, value } = event.target;

    job[name] = value;

    if (value == "") {
      delete job[name];
    }

    setJob({ ...job });
  };

  return (
    <Box padding={10}>
      <Flex direction="column" alignItems="center" gap={10}>
        <DummyAvatar src={ToothIcon} />
        <form
          onSubmit={handleSubmit}
          style={{ alignSelf: "flex-start", width: "100%" }}
        >
          <Box
            borderWidth={1}
            borderColor="blackAlpha.400"
            borderRadius={5}
            overflow="hidden"
            width="100%"
          >
            <Table>
              <Tbody>
                <Tr>
                  <Th>
                    <Text fontSize="md">Date</Text>
                  </Th>
                  <Td>
                    <Input
                      name="date"
                      type="date"
                      value={job?.date || ""}
                      onChange={formSetter}
                      required={true}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Job No</Text>
                  </Th>
                  <Td>
                    <Input
                      name="jobNumber"
                      placeholder="Enter job number"
                      value={job?.jobNumber || ""}
                      onChange={formSetter}
                      required={true}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Patient Name</Text>
                  </Th>
                  <Td>
                    <Input
                      name="patientName"
                      placeholder="Enter patient name"
                      value={job?.patientName || ""}
                      onChange={formSetter}
                      required={true}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Shade</Text>
                  </Th>
                  <Td>
                    <Input
                      name="shade"
                      placeholder="Enter shade"
                      value={job?.shade || ""}
                      onChange={formSetter}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Notes</Text>
                  </Th>
                  <Td>
                    <Input
                      name="notes"
                      placeholder="Add notes"
                      value={job?.notes || ""}
                      onChange={formSetter}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Text fontSize="md">Doctor</Text>
                  </Th>
                  <Td>{doctor?.name}</Td>
                </Tr>
                <Tr>
                  <Td verticalAlign="top">
                    <JobWorkSelector
                      typeOfWorks={doctor?.typeOfWorks || []}
                      selectTypeOfWork={selectWork}
                      selectedTypeOfWorks={works.map((el) => el.title)}
                    />
                  </Td>
                  <Td verticalAlign="top">
                    <Flex direction="column" gap={5}>
                      {works.map((el, index) => (
                        <Box
                          key={index}
                          width="40vw"
                          borderWidth={1}
                          borderRadius={10}
                          boxShadow="md"
                        >
                          <Table>
                            <Thead>
                              <Tr>
                                <Th
                                  colSpan={2}
                                  textAlign="center"
                                  borderWidth={0}
                                >
                                  <Text fontSize="md">{el.title}</Text>
                                </Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td borderRightWidth={1}>
                                  <Input
                                    name="topLeft"
                                    id={index}
                                    borderColor="blackAlpha.500"
                                    placeholder="Upper Left"
                                    value={el?.topLeft || ""}
                                    onChange={updateWork}
                                  />
                                </Td>
                                <Td>
                                  <Input
                                    borderColor="blackAlpha.500"
                                    placeholder="Upper Right"
                                    name="topRight"
                                    id={index}
                                    value={el?.topRight || ""}
                                    onChange={updateWork}
                                  />
                                </Td>
                              </Tr>
                              <Tr>
                                <Td borderRightWidth={1} borderBottomWidth={0}>
                                  <Input
                                    borderColor="blackAlpha.500"
                                    placeholder="Lower Left"
                                    name="bottomLeft"
                                    id={index}
                                    value={el?.bottomLeft || ""}
                                    onChange={updateWork}
                                  />
                                </Td>
                                <Td borderBottomWidth={0}>
                                  <Input
                                    borderColor="blackAlpha.500"
                                    placeholder="Lower Right"
                                    name="bottomRight"
                                    id={index}
                                    value={el?.bottomRight || ""}
                                    onChange={updateWork}
                                  />
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </Box>
                      ))}
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Flex justifyContent="center">
                      <Button onClick={() => navigate("/jobs")}>Cancel</Button>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex justifyContent="center">
                      <Button type="submit" colorScheme="yellow">
                        Submit
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </form>
      </Flex>
    </Box>
  );
};

export default AddJob;
