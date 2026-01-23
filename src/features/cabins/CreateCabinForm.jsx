import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createCabin, editCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editData } = cabinToEdit;
  const isEditMode = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editData,
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: mutateCreateCabin, isPending: isCreating } = useMutation({
    mutationFn: (cabin) => createCabin(cabin),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateEditCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ cabin, id }) => editCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const isPending = isCreating || isEditing;

  const onSubmit = (data) => {
    if (isEditMode) {
      mutateEditCabin({
        cabin: { ...data, image_link: data.image_link },
        id: editId,
      });
    } else {
      mutateCreateCabin({ ...data, image_link: data.image_link });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isPending}
          {...register("max_capacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isPending}
          {...register("regular_price", {
            required: "Regular price is required",
            min: { value: 1, message: "Price must be greater than 0" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            required: "If no discount, enter 0",
            validate: (value) =>
              value <= getValues().regular_price ||
              "Discount cannot exceed regular price",
            min: {
              value: 0,
              message: "If no discount, enter 0",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          {...register("description", {
            required: "Description is required",
          })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image_link"
          accept="image/*"
          type="file"
          disabled={isPending}
          {...register("image_link")}
        />
      </FormRow>
      <FormRow>
        {isEditMode || (
          <Button disabled={isPending} variation="secondary" type="reset">
            Cancel
          </Button>
        )}
        <Button disabled={isPending}>
          {isEditMode ? "Update cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
