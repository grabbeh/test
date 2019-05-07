import React from 'react'
import { Formik, Form } from 'formik'
import { string, object } from 'yup'
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
      validationSchema={object().shape({
        url: string()
          .url()
          .required('Please provide a valid url')
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        setErrors({
          url: false,
          serverError: false
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
              type='text'
              handleChange={handleChange}
              name='url'
              fontSize={[2, 3]}
              value={values.url}
              placeholder='Please enter package.json URL'
            />
            <Box mt={2}>{touched.url && <Error>{errors.url}</Error>}</Box>
            <Box mt={2}>
              <Error>{errors.serverError}</Error>
            </Box>
            <Box mt={3}>
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
