import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

interface SignupCredentials {
  email: string
  password: string
  username: string
}

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient()
  const toast = useToast()

  const handleSignup = async (credentials: SignupCredentials) => {
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp(credentials)
      if (error) throw error
      toast({
        title: "Welcome to The BreweryFinder!",
        description: "Enjoy your journey into the world of breweries!",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Sorry there was an error signing up",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const initialValues: SignupCredentials = {
    email: "",
    password: "",
    username: "",
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        username: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        handleSignup(values)
      }}
    >
      {(formik) => (
        <Form>
          <Heading my="4">Signup for an account</Heading>
          <VStack
            align="start"
            spacing={8}
            w={{ base: "100%", md: "lg" }}
            mx="2"
          >
            <Flex direction="column" w="full">
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                {...formik.getFieldProps("email")}
                bg="white"
              />
              <ErrorMessage name="email" />
            </Flex>
            <Flex direction="column" w="full">
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
                {...formik.getFieldProps("username")}
                bg="white"
              />
              <ErrorMessage name="username" />
            </Flex>
            <Flex direction="column" w="full">
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                {...formik.getFieldProps("password")}
                bg="white"
              />
              <ErrorMessage name="password" />
            </Flex>

            <Button type="submit" disabled={loading} isLoading={loading}>
              Submit
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  )
}
