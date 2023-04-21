import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { ErrorMessage, Form, Formik } from "formik"
import * as Yup from "yup"
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"

interface LoginCredentials {
  email: string
  password: string
}

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const supabase = useSupabaseClient()

  async function handleLogin(credentials: LoginCredentials) {
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        credentials
      )

      if (error) throw error

      // TODO: Display notification when logged in
      console.log(data)
      // alert("Logged in successfully!")
    } catch (error) {
      alert(error)
      setLoginError(
        "Sorry, the entered email or password was incorrect. Please try again"
      )
    } finally {
      setLoading(false)
    }
  }

  const initialValues: LoginCredentials = {
    email: "",
    password: "",
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        handleLogin(values)
      }}
    >
      {(formik) => (
        <Form>
          <Heading my="4">Login to your account</Heading>
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
                placeholder="Your email"
                {...formik.getFieldProps("email")}
                bg="white"
              />
              <ErrorMessage name="email" />
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
            {loginError && <Text>{loginError}</Text>}
          </VStack>
        </Form>
      )}
    </Formik>
  )
}
