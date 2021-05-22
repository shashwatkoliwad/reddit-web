import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "./utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "./utils/createUrqlClient";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            //   route to home
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
            </Box>
            <Flex mt={2}>
            <NextLink href='/forgot-password'>
              <Link ml='auto' color='purple'>Forgot Password?</Link>
            </NextLink>
            </Flex>
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              Login
            </Button>
            
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
