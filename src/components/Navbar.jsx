import { Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      padding={4}
      alignItems="center"
      justifyContent="space-between"
      bg="#f7f7fb"
      boxShadow="md"
    >
      <Heading as="h4" size="md">
        Shree Laxmi Dental Lab
      </Heading>
      <Flex gap={6}>
        <Link to="/">
          <Text fontSize="lg">Doctor</Text>
        </Link>
        <Link to="/addDoctor">
          <Text fontSize="lg">Add Doctor</Text>
        </Link>
        <Link to="/bill">
          <Text fontSize="lg">All Bills</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
