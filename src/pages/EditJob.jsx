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
import { useNavigate, useParams } from "react-router-dom";
import fetchJobById from "../apiHelpers/fetchJobById";
import updateJobById from "../apiHelpers/updateJobById";

const EditJob = () => {
  const [job, setJob] = useState({});

  const { jobId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobById(jobId)
      .then(({ data }) => {
        setJob(data?.response);
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

  const updateJob = (event) => {
    const { name, value } = event.target;
    job[name] = value;
    setJob({ ...job });
  };

  const updateWork = (event) => {
    const { name, id: index, value } = event.target;

    job.works[index][name] = value;

    if (job.works[index][name] == "") {
      delete job.works[index][name];
    }

    setJob({ ...job });
  };

  const handleSubmit = async () => {
    try {
      delete job.__v;
      delete job._id;

      await updateJobById(jobId, job);
      toast({
        title: "Success",
        description: `Job ${job?.jobNumber} was updated`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
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

  return (
    <Box padding={10}>
      <Flex direction="column" gap={10} alignItems="center">
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
                    value={job?.date?.split("T").shift() || ""}
                    onChange={updateJob}
                    borderColor="grey"
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
                    type="number"
                    placeholder="Enter job number"
                    value={job?.jobNumber || ""}
                    onChange={updateJob}
                    borderColor="grey"
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
                    onChange={updateJob}
                    borderColor="grey"
                  />
                </Td>
              </Tr>
              <Tr>
                <Th>
                  <Text fontSize="md">Doctor</Text>
                </Th>
                <Td>{job?.doctorName}</Td>
              </Tr>
              <Tr>
                <Th borderWidth={0}>
                  <Text fontSize="md">Work Types</Text>
                </Th>
                <Td borderWidth={0}>
                  <Text>{job?.works?.map((e) => e.title).join(", ")}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex
          justifyContent="space-between"
          width="70vw"
          margin="2rem auto"
          alignItems="center"
        >
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={() => navigate("/")}>Cancel</Button>
        </Flex>
        <Flex width="40vw" direction="column" gap={10}>
          {job?.works?.map((el, index) => (
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
      </Flex>
    </Box>
  );
};

export default EditJob;
