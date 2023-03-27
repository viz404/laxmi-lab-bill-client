import { Box, Checkbox, Flex, Input, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDoctorsHelper } from "../reduxStore/doctor/doctorActions";

const DoctorSelector = ({ selectDoctor }) => {
  const { doctors } = useSelector((store) => store.doctor);
  const [search, setSearch] = useState("");

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadDoctorsHelper(toast, 1, search, 20));
    }, 500);
  }, [search]);

  const onChecked = (event, index) => {
    const status = event.target.checked;
    const selectedDoctor = doctors[index];

    delete selectedDoctor.address;
    delete selectedDoctor.area;
    delete selectedDoctor.phone;
    delete selectedDoctor.__v;

    selectDoctor(status ? selectedDoctor : {});
  };

  return (
    <Flex
      borderWidth={1}
      borderRadius={15}
      padding={2}
      direction="column"
      gap={3}
      minWidth="15vw"
      boxShadow="md"
    >
      <Input
        placeholder="Search Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Flex
        maxHeight={"40vh"}
        overflowY="auto"
        direction="column"
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
        {doctors.map((el, index) => (
          <Flex
            key={index}
            margin={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Checkbox
              size="lg"
              id={el.id}
              name={el.name}
              spacing="1rem"
              onChange={(event) => onChecked(event, index)}
            >
              {el.name}
            </Checkbox>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default DoctorSelector;
