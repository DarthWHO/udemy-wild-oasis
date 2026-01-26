import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

import Error from "../../ui/Error";

function UpdateSettingsForm() {
  const { isPending, settings, error } = useSettings();
  const { updateSettings, isUpdating } = useUpdateSettings();

  if (isPending) return <Spinner />;
  if (error) return <Error />;

  const handleUpdate = (e, field) => {
    const value = e.target.value;

    if (value == settings[field]) return;
    if (!value) return;

    updateSettings({ [field]: value });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.minimum_booking_length}
          onBlur={(e) => handleUpdate(e, "minimum_booking_length")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.maximum_booking_length}
          onBlur={(e) => handleUpdate(e, "maximum_booking_length")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.max_guests_per_booking}
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfast_price}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
