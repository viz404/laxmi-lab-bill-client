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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import calculatePriceV2 from "../calculationHelpers/calculatePriceV2";

import DoctorSelector from "../components/DoctorSelector";
import JobWorkSelector from "../components/JobWorkSelector";
import { addJobHandler } from "../reduxStore/jobs/jobActions";

const AddJob = () => {
  const [date, setDate] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [price, setPrice] = useState("");
  const [works, setWorks] = useState([]);
  const [doctor, setDoctor] = useState({});

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateDoctor = (selectedDoctor) => {
    if (selectedDoctor._id) {
      setDoctor({ ...selectedDoctor });
    } else {
      setDoctor({});
    }

    setPrice("");
    setWorks([]);
  };

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
      let filtered = works.filter((e) => e._id != element._id);
      setWorks([...filtered]);
    }
  };

  const updateWork = (event) => {
    const { id: index, name: position, value } = event.target;

    works[index][position] = value;

    if (works[index][position] == "") {
      delete works[index][position];
    }

    setWorks([...works]);
  };

  const handleSubmit = async () => {
    try {
      let missing = [];

      if (date == "") {
        missing.push("Date");
      }

      if (jobNumber == "") {
        missing.push("Job no");
      }

      if (patientName == "") {
        missing.push("Patient name");
      }

      if (!doctor.name) {
        missing.push("Doctor");
      }

      if (works.length == 0) {
        missing.push("Works");
      }

      if (missing.length > 0) {
        throw new Error(missing.join(", "));
      }

      let jobObj = {
        date,
        jobNumber,
        patientName,
        doctorName: doctor.name,
        doctorId: doctor._id,
        works,
        price: calculatePriceV2(works),
      };

      dispatch(addJobHandler(jobObj, toast, navigate));
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

  return (
    <Box padding={10}>
      <Flex gap={20} justifyContent="center">
        <Flex direction="column" gap={5} width="15vw">
          <DoctorSelector selectDoctor={updateDoctor} />
          <JobWorkSelector
            typeOfWorks={doctor?.typeOfWorks || []}
            selectTypeOfWork={selectWork}
          />
          <Button colorScheme="cyan" onClick={handleSubmit}>
            Add
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Flex>
        <Box width="45vw" borderWidth={1} borderRadius={10} boxShadow="md">
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
                    onChange={(e) => setDate(e.target.value)}
                  />
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
                    onChange={(e) => setJobNumber(Number(e.target.value))}
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
                    onChange={(e) => setPatientName(e.target.value)}
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
                <Th borderWidth={0}>
                  <Text fontSize="md">Work Types</Text>
                </Th>
                <Td borderWidth={0}>
                  <Text>{works.map((e) => e.title).join(", ")}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <Flex marginTop={20} justifyContent="center" gap={100}>
        <Flex width="40vw" direction="column" gap={10}>
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
                    <Th colSpan={2} textAlign="center" borderWidth={0}>
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
                        onChange={updateWork}
                      />
                    </Td>
                    <Td>
                      <Input
                        borderColor="blackAlpha.500"
                        placeholder="Upper Right"
                        name="topRight"
                        id={index}
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
                        onChange={updateWork}
                      />
                    </Td>
                    <Td borderBottomWidth={0}>
                      <Input
                        borderColor="blackAlpha.500"
                        placeholder="Lower Right"
                        name="bottomRight"
                        id={index}
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
    </Box>
  );
};

export default AddJob;
