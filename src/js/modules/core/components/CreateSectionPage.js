import React from "react"
import SectionForm from './SectionForm'

const CreateSectionPage = () => {
  const handleSubmit = formValues => {
    console.log(formValues);
  }
  return(
    <SectionForm onSubmit={handleSubmit} />
  )
}

export default CreateSectionPage;