import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Collapse,
  Flex,
  IconButton,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkTypeHelper,
  deleteWorkTypeHelper,
} from "../reduxStore/workType/workTypeActions";

const WorkSelector = ({
  width,
  maxHeight,
  selectedWorkTypes,
  selectTypeOfWork,
}) => {
  const [addWorkType, setAddWorkType] = useState("");
  const [workTypes, setWorkTypes] = useState([]);
  const { types } = useSelector((store) => store.work);

  useEffect(() => {
    let loadWorkTypes = types.map((el) => {
      return {
        ...el,
        status: selectedWorkTypes.includes(el.title),
      };
    });

    if (loadWorkTypes.length != 0) {
      setWorkTypes([...loadWorkTypes]);
    }
  }, [types, selectedWorkTypes]);

  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const addNewWorkType = () => {
    const title = addWorkType.toUpperCase();

    if (title == "") {
      return;
    }
    dispatch(addWorkTypeHelper(title, toast));
    setAddWorkType("");
    onToggle();
  };

  const deleteWorkType = (id) => {
    dispatch(deleteWorkTypeHelper(id, toast));
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    if (key == "Enter") {
      event.preventDefault();
      addNewWorkType();
    }
  };

  const handleOnChange = (event) => {
    const {
      target: { value },
    } = event;

    setAddWorkType(value);
  };

  return (
    <Flex
      borderWidth={1}
      borderRadius={15}
      padding={2}
      direction="column"
      gap={3}
      width={width || "20vw"}
    >
      <Flex
        maxHeight={maxHeight || "40vh"}
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
        {workTypes.map((el, index) => (
          <Flex
            key={index}
            margin={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Checkbox
              isChecked={el.status}
              size="lg"
              id={el._id}
              name={el.title}
              onChange={selectTypeOfWork}
            >
              {el.title}
            </Checkbox>
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => deleteWorkType(el._id)}
            />
          </Flex>
        ))}
      </Flex>
      <Button colorScheme="blue" onClick={onToggle}>
        Add New
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Flex gap={2}>
          <Input
            placeholder="Enter new work"
            value={addWorkType}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            onSubmit={addNewWorkType}
          />
          <IconButton
            aria-label="add new work"
            icon={<AddIcon />}
            onClick={addNewWorkType}
          />
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default WorkSelector;
