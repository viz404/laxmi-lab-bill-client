import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fetchDoctorById from "../apiHelpers/fetchDoctorById";
import DummyAvatar from "../components/DummyAvatar";
import FormTable from "../components/FormTable";
import WorkPriceTable from "../components/WorkPriceTable";
import WorkSelector from "../components/WorkSelector";
import { addDoctorHelper } from "../reduxStore/doctor/doctorActions";
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

  const submitDoctor = () => {
    let missing = [];

    if (doctor.name == "") {
      missing.push("Name");
    }

    if (doctor.phone == "") {
      missing.push("Phone");
    }

    if (doctor.area == "") {
      missing.push("Area");
    }

    if (doctor.address == "") {
      missing.push("Address");
    }

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
      dispatch(addDoctorHelper(doctor, toast, navigate));
    }
  };

  return (
    <Box padding={3}>
      <Flex
        marginTop={3}
        alignItems="center"
        gap={10}
        justifyContent="space-around"
      >
        <DummyAvatar />
        <Box flexGrow={2}>
          <FormTable
            name={doctor.name}
            phone={doctor.phone}
            area={doctor.area}
            address={doctor.address}
            setter={formSetter}
          />
        </Box>
        <IconButton
          size="lg"
          bg="blue.100"
          icon={<AddIcon />}
          onClick={submitDoctor}
        />
      </Flex>
      <Flex gap={10} alignItems="flex-start" paddingX={5} marginTop={10}>
        <WorkSelector
          selectedWorkTypes={doctor.typeOfWorks.map((e) => e.title)}
          selectTypeOfWork={selectTypeOfWork}
        />
        <WorkPriceTable
          typeOfWorks={doctor.typeOfWorks}
          updateWorkPrice={updateWorkPrice}
        />
      </Flex>
    </Box>
  );
};

export default AddDoctor;
