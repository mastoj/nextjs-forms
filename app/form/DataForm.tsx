"use client";
import React from "react";
import { z } from "zod";
import ContactInfo, { ContactInfoSchema } from "./ContactInfo";
import Form from "./Form";

const DataSchema = z.object({
  someValue: z.string().min(2).max(20),
  contactInfo: ContactInfoSchema,
});

type DataType = z.infer<typeof DataSchema>;

const DataForm = (props: unknown) => {
  const handleSubmit = (data: DataType) => {
    console.log("Submitting: ", data);
  };
  return (
    <Form<DataType, typeof DataSchema>
      onSubmit={handleSubmit}
      schema={DataSchema}
    >
      <Form.Input<DataType>
        name="someValue"
        displayName="Some Value"
        type="number"
      />
      <ContactInfo propertyName={"contactInfo"} />
      <button type="submit" className="px-4 py-2 bg-green-600 rounded">
        Submit
      </button>
    </Form>
  );
};

export default DataForm;
