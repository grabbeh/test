import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Box from './Box'
import Text from './Text'
import Flex from './Flex'
import Button from './Button'
import Input from './Input'
import axios from 'axios'
import Error from './Error'

const UrlForm = props => {
  return (
    <Formik
      initialValues={{
        url: ''
      }}
      validateOnChange={false}
      validationSchema={Yup.object().shape({
        url: Yup.string()
          .url()
          .required('Please provide a valid url')
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        setErrors({
          url: false,
          existingSubscription: false
        })
        let { url } = values
        axios
          .post('/.netlify/functions/submit-license', { url })
          .then(r => {
            setSubmitting(false)
            props.setResponse(r.data)
          })
          .catch(err => {
            setSubmitting(false)
            setSubmitting(false)
            setErrors({
              serverError: err.response.data
            })
          })
      }}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange } = props
        return (
          <Form>
            <Input
              borderRadius={2}
              width={1}
              type='text'
              handleChange={handleChange}
              name='url'
              fontSize={[2, 4]}
              value={values.url}
            />
            <Box mt={2}>{touched.url && <Error>{errors.url}</Error>}</Box>
            <Box mt={2}>
              <Error>{errors.serverError}</Error>
            </Box>
            <Box mt={2}>
              <Flex justifyContent='flex-end'>
                <Button disabled={isSubmitting} type='submit' px={3} py={2}>
                  {isSubmitting ? (
                    <Text fontSize={2}>Loading...</Text>
                  ) : (
                    <Text color='white' fontSize={2}>
                      Submit
                    </Text>
                  )}
                </Button>
              </Flex>
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}

export default UrlForm
