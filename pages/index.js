import { useState } from "react"
import { VStack, Toast, Badge, Box, Input, Button, Heading, Textarea } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function Home() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // catch error messages
  } = useForm();

  const [loading, setLoading] = useState(false)


  async function submitHandler(data) {

    setLoading(true)

    try {

      const res = await axios.post(`/api/sheet`, data)

      if (res.status === 201) {
        setLoading(false)
      }

      console.log(res)

    } catch (error) {
      console.log(error);
    }

    // clear the input on submitting
    reset();

  }

  return (
    <Box p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      width="60%"
      margin="3rem auto"
      align="center"
    >



      <Heading>
        Your response matters!
      </Heading>



      <form onSubmit={handleSubmit(submitHandler)}>

        <Input
          placeholder="Enter Name"
          variant="filled"
          mt={2}
          {...register('Name', { required: 'Please enter your name' })}
        />
        {errors.Name && <Badge colorScheme="red">{errors.Name.message}</Badge>}



        <Input
          placeholder="Enter Email"
          variant="filled"
          mt={2}
          {...register('Email', {
            required: 'Please enter your Email',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address" }
          })}
        />
        {errors.Email && <Badge colorScheme="red">{errors.Email.message}</Badge>}


        <Textarea
          placeholder="Enter Message"
          variant="filled"
          mt={2}
          {...register('Feedback', { required: 'Enter your feedback!' })}
        />
        {errors.Feedback && <Badge colorScheme="red">{errors.Feedback.message}</Badge>}




        <VStack align="center">
          <Button
            colorScheme="teal" variant="solid"
            type="submit"
            mt={2}
            isLoading={loading}
          >
            Submit Form
          </Button>

        </VStack>

      </form>


    </Box>
  )
}
