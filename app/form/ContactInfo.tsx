"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import Form from "./Form";

export const ContactInfoSchema = z.object({
  firstName: z.string().max(20),
  lastName: z.string().min(2).max(20),
});

export type ContactInfoType = z.infer<typeof ContactInfoSchema>;

type Props = {
  propertyName: string;
};

const ContactInfoComp = ({ propertyName }: Props) => {
  return (
    <div>
      <Form.Input<ContactInfoType>
        name="firstName"
        displayName="First Name"
        type="text"
        propertyPrefix={propertyName}
      />
      <Form.Input<ContactInfoType>
        name="lastName"
        displayName="Last Name"
        type="text"
        propertyPrefix={propertyName}
      />
    </div>
  );
};

export default ContactInfoComp;
