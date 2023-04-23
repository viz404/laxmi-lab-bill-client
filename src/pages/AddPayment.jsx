import {
  Box,
  Button,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchDoctorById from "../apiHelpers/fetchDoctorById";
import fetchAccountByDoctorId from "../apiHelpers/fetchAccountByDoctorId";
import makePayment from "../apiHelpers/makePayment";

const AddPayment = () => {
  const [doctor, setDoctor] = useState({});
  const [account, setAccount] = useState({});
  const [payment, setPayment] = useState({});

  const { doctorId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId) {
      fetchDoctorById(doctorId)
        .then(({ data: { response } }) => {
          setDoctor(response);
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Something went wrong",
            description: error.message,
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });

      fetchAccountByDoctorId(doctorId)
        .then(({ data: { response } }) => {
          setAccount(response);
        })
        .catch((error) => {
          console.error(error);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    payment.doctor = doctor._id;

    switch (payment.mode) {
      case "Online UPI": {
        delete payment.chequeNumber;
        break;
      }
      case "Cheque": {
        delete payment.mobile;
        break;
      }
      case "Bank Transfer": {
        delete payment.chequeNumber;
        delete payment.mobile;
        break;
      }
    }

    try {
      await makePayment(payment);
      toast({
        title: "Success",
        description: `Payment of ₹ ${payment.amount} was added`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/account");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    console.log(payment);
  };

  return (
    <Box padding={10}>
      <form onSubmit={handleSubmit}>
        <Table>
          <Tbody>
            <Tr>
              <Th fontSize={15}>Doctor Name</Th>
              <Td>{doctor?.name}</Td>
            </Tr>
            <Tr>
              <Th fontSize={15}>Previous Balance</Th>
              <Td>₹ {account?.balance}</Td>
            </Tr>
            <Tr>
              <Th fontSize={15}>Payment Amount</Th>
              <Td>
                <Input
                  borderColor="grey"
                  type="number"
                  value={payment?.amount || ""}
                  placeholder="Add Amount"
                  onChange={(e) =>
                    setPayment((prev) => {
                      return { ...prev, amount: e.target.value };
                    })
                  }
                  required={true}
                />
              </Td>
            </Tr>
            <Tr>
              <Th fontSize={15}>Date</Th>
              <Td>
                <Input
                  type="date"
                  borderColor="grey"
                  value={payment?.date || ""}
                  onChange={(e) =>
                    setPayment((prev) => {
                      return { ...prev, date: e.target.value };
                    })
                  }
                  required={true}
                />
              </Td>
            </Tr>
            <Tr>
              <Th fontSize={15}>Mode</Th>
              <Td>
                <Select
                  borderColor="grey"
                  placeholder="Select Payment mode"
                  value={payment?.mode || ""}
                  onChange={(e) =>
                    setPayment((prev) => {
                      return { ...prev, mode: e.target.value };
                    })
                  }
                  required={true}
                >
                  <option value="Online UPI">Online UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </Select>
              </Td>
            </Tr>
            {payment?.mode == "Online UPI" ? (
              <Tr>
                <Th fontSize={15}>Enter Payment number</Th>
                <Td>
                  <Input
                    type="number"
                    value={payment?.mobile || ""}
                    placeholder="Enter mobile number"
                    onChange={(e) =>
                      setPayment((prev) => {
                        return { ...prev, mobile: e.target.value };
                      })
                    }
                    required={true}
                  />
                </Td>
              </Tr>
            ) : (
              payment?.mode == "Cheque" && (
                <Tr>
                  <Th fontSize={15}>Enter Cheque number</Th>
                  <Td>
                    <Input
                      value={payment?.chequeNumber || ""}
                      placeholder="Enter cheque number"
                      onChange={(e) =>
                        setPayment((prev) => {
                          return { ...prev, chequeNumber: e.target.value };
                        })
                      }
                      required={true}
                    />
                  </Td>
                </Tr>
              )
            )}
            <Tr>
              <Th fontSize={15}>Notes</Th>
              <Td>
                <Input
                  borderColor="grey"
                  value={payment?.note || ""}
                  placeholder="Add Notes"
                  onChange={(e) =>
                    setPayment((prev) => {
                      return { ...prev, notes: e.target.value };
                    })
                  }
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Link to="/account">
                  <Button>Cancel</Button>
                </Link>
              </Td>
              <Td>
                <Button type="submit" colorScheme="blue">
                  Add Payment
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </form>
    </Box>
  );
};

export default AddPayment;
