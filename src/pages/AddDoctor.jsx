import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fetchDoctorById from "../apiHelpers/fetchDoctorById";
import DummyAvatar from "../components/DummyAvatar";
import FormTable from "../components/FormTable";
import WorkPriceTable from "../components/WorkPriceTable";
import WorkSelector from "../components/WorkSelector";
import {
  addDoctorHelper,
  updateDoctorHelper,
} from "../reduxStore/doctor/doctorActions";
import { loadWorkTypesHelper } from "../reduxStore/workType/workTypeActions";

const initialData = {
  name: "",
  phone: "",
  area: "",
  address: "",
  typeOfWorks: [],
};

const AddDoctor = () => {
  const [doctor, setDoctor] = useState(initialData);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadWorkTypesHelper(toast));

    if (id) {
      fetchDoctorById(id)
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
    }
  }, []);

  const formSetter = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    doctor[name] = value;
    setDoctor({ ...doctor });
  };

  const selectTypeOfWork = (event) => {
    const title = event.target.name;
    const status = event.target.checked;
    let updateTypeOfWorks = [];

    if (status) {
      updateTypeOfWorks = [...doctor.typeOfWorks, { title }];
    } else {
      updateTypeOfWorks = doctor.typeOfWorks.filter((e) => e.title != title);
    }

    doctor.typeOfWorks = updateTypeOfWorks;
    setDoctor({ ...doctor });
  };
  const updateWorkPrice = (event) => {
    const title = event.target.name;
    const value = event.target.value;

    let updateTypeOfWorks = doctor.typeOfWorks.map((e) => {
      if (e.title == title) {
        e.price = value;
      }
      return e;
    });

    doctor.typeOfWorks = updateTypeOfWorks;

    setDoctor({ ...doctor });
  };

  const submitDoctor = (event) => {
    event.preventDefault();

    let missing = [];

    if (doctor.typeOfWorks.length == 0) {
      missing.push("Work");
    } else {
      for (let work of doctor.typeOfWorks) {
        if (work.price == 0 || work.price == "") {
          missing.push(work.title);
        }
      }
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
      if (id) {
        dispatch(updateDoctorHelper(doctor, toast, navigate));
      } else {
        dispatch(addDoctorHelper(doctor, toast, navigate));
      }
    }
  };

  return (
    <Box paddingY={3} paddingX={10}>
      <Flex direction="column" alignItems="center" gap={10}>
        <DummyAvatar rounded={true} />
        <form
          style={{ alignSelf: "flex-start", width: "100%" }}
          onSubmit={submitDoctor}
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
                    <Heading as="h5" size="sm">
                      Name
                    </Heading>
                  </Th>
                  <Td>
                    <Input
                      required={true}
                      placeholder="Enter name"
                      value={doctor.name || ""}
                      name="name"
                      onChange={formSetter}
                      borderWidth={1}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Heading as="h5" size="sm">
                      Phone No
                    </Heading>
                  </Th>
                  <Td>
                    <Input
                      required={true}
                      placeholder="Enter Phone no"
                      value={doctor.phone || ""}
                      name="phone"
                      onChange={formSetter}
                      borderWidth={1}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Heading as="h5" size="sm">
                      Area
                    </Heading>
                  </Th>
                  <Td>
                    <Input
                      required={true}
                      placeholder="Enter area"
                      value={doctor.area || ""}
                      name="area"
                      onChange={formSetter}
                      borderWidth={1}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Heading as="h5" size="sm">
                      Address
                    </Heading>
                  </Th>
                  <Td>
                    <Input
                      required={true}
                      placeholder="Enter address"
                      value={doctor.address || ""}
                      name="address"
                      onChange={formSetter}
                      borderWidth={1}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th>
                    <Heading as="h5" size="sm">
                      Previous Balance
                    </Heading>
                  </Th>
                  <Td>
                    <Input
                      placeholder="Enter balance"
                      value={doctor.previousBalance || ""}
                      type="number"
                      name="previousBalance"
                      onChange={formSetter}
                      borderWidth={1}
                      borderColor="blackAlpha.400"
                    />
                  </Td>
                </Tr>
                {doctor?.previousBalance > 0 && (
                  <Tr>
                    <Th>
                      <Heading as="h5" size="sm">
                        Balance Description
                      </Heading>
                    </Th>
                    <Td>
                      <Input
                        placeholder="Enter description"
                        value={doctor.balanceDescription || ""}
                        name="balanceDescription"
                        onChange={formSetter}
                        borderWidth={1}
                        borderColor="blackAlpha.400"
                        required={true}
                      />
                    </Td>
                  </Tr>
                )}
                <Tr>
                  <Td verticalAlign="top">
                    <WorkSelector
                      selectedWorkTypes={doctor.typeOfWorks.map((e) => e.title)}
                      selectTypeOfWork={selectTypeOfWork}
                    />
                  </Td>
                  <Td verticalAlign="top">
                    <WorkPriceTable
                      typeOfWorks={doctor.typeOfWorks}
                      updateWorkPrice={updateWorkPrice}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Flex justifyContent="center">
                      <Button onClick={() => navigate("/doctors")}>
                        Cancel
                      </Button>
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

export default AddDoctor;
