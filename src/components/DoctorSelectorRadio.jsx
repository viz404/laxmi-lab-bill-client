import {
  Box,
  Checkbox,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDoctorsHelper } from "../reduxStore/doctor/doctorActions";

const DoctorSelectorRadio = ({ selectDoctor, initialIndex = "" }) => {
  const { doctors } = useSelector((store) => store.doctor);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadDoctorsHelper(toast, 1, search, 20));
    }, 500);
  }, [search]);

  useEffect(() => {
    if (selectedIndex) {
      const selectedDoctor = doctors[selectedIndex];

      delete selectedDoctor.address;
      delete selectedDoctor.area;
      delete selectedDoctor.phone;
      delete selectedDoctor.__v;

      selectDoctor(selectedDoctor);
    }
  }, [selectedIndex]);

  const onSelect = () => {
    console.log(selectedIndex);

    // selectDoctor(selectedDoctor);
  };

  return (
    <Flex
      borderWidth={1}
      borderRadius={15}
      padding={2}
      direction="column"
      gap={3}
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
        <RadioGroup>
          <Stack
            spacing={1}
            direction="column"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(e.target.value)}
          >
            {doctors.map((el, index) => (
              <Radio
                key={el._id}
                colorScheme="blue"
                value={index + ""}
                name={el.name}
                size="lg"
                spacing={5}
              >
                {el.name}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};

export default DoctorSelectorRadio;
