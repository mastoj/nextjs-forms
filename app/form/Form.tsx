"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

type GenericOnSubmit = (
  data: Record<string, any>,
  event?: React.BaseSyntheticEvent
) => void;

type Props<
  DataSchema extends Record<string, any>,
  Schema extends z.Schema<any, any>
> = {
  schema: Schema;
  onSubmit: (data: DataSchema, event?: React.BaseSyntheticEvent) => void;
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
};

const Form = <
  DataSchema extends Record<string, any>,
  Schema extends z.Schema<any, any>
>({
  schema,
  children,
  defaultValues,
  onSubmit,
}: Props<DataSchema, Schema>) => {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const handleSubmit = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as GenericOnSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

Form.Input = function Input<Model extends Record<string, any>>({
  name,
  displayName,
  type,
  propertyPrefix,
}: {
  name: keyof Model;
  displayName: string;
  type: string;
  propertyPrefix?: string;
}) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const propertyName = propertyPrefix
    ? `${propertyPrefix}.${name as string}`
    : name;

  const fieldErrors = propertyPrefix
    ? (errors[propertyPrefix as string] as any)?.[name as string]
    : errors[propertyName as string];
  console.log("==> Errors: ", errors);
  return (
    <div>
      <label className="block">
        <span className="block">{displayName}</span>
        <input
          type={type}
          className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
          {...register(propertyName as string)}
          disabled={isSubmitting}
        />
      </label>
      {fieldErrors && (
        <p className="error">{fieldErrors.message?.toString()}</p>
      )}
    </div>
  );
};

export default Form;
