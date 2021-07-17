import useForm from "@hooks/form/useForm";
import Validators from "@hooks/form/validators";
import authSignin from "lib/utils/auth";

import { useRouter } from "next/dist/client/router";

import { FormEventHandler } from "react";

import Button from "@components/atoms/Button";
import PhoneInput from "@components/atoms/PhoneInput";
import TextInput from "@components/atoms/TextInput";

import { RootWrapper, FormWrapper } from "./styles";

interface IAuthFormFields {
  phonenumber: string;
  otp: string;
}

const AuthForm: React.FC = () => {
  const { fields, fieldValueSetter, fieldErrorSetter, getValidatedData } =
    useForm<IAuthFormFields>({
      fields: {
        phonenumber: {
          required: true,
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "Phone number is required",
            },
          ],
        },
        otp: {
          required: true,
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "OTP is required",
            },
          ],
        },
      },
    });
  const router = useRouter();

  const handleError = (error: Error) => {
    try {
      const errorInfo = JSON.parse(error.message);
      fieldErrorSetter("phonenumber", errorInfo.phonenumber);
      fieldErrorSetter("otp", errorInfo.otp);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const onSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = getValidatedData();
    if (data) {
      try {
        await authSignin({
          ...data,
          redirect: false,
        });

        router.push("/home");
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <RootWrapper>
      <h4>
        Sign in to <br />
        Crater.Club
      </h4>
      <FormWrapper onSubmit={onSubmitForm}>
        <PhoneInput
          placeholder="Your phone number"
          onChange={(val) => fieldValueSetter("phonenumber", val)}
          error={fields.phonenumber?.errors[0]}
          value={fields.phonenumber.value}
        />
        <TextInput
          type="password"
          label="Your password"
          placeholder="Your email address"
          onChange={(val) => fieldValueSetter("otp", val)}
          error={fields.otp.errors[0]}
        />
        <Button label="Signin" />
      </FormWrapper>
    </RootWrapper>
  );
};

export default AuthForm;
