import Button from "lib/common/components/atoms/Button";
import OtpInput from "lib/common/components/atoms/OtpInput";
import useForm from "lib/common/hooks/form/useForm";
import Validators from "lib/common/hooks/form/validators";
import authSignin from "lib/common/utils/auth";
import AuthApiClient from "lib/modules/auth/api";
import PhoneInput from "lib/modules/auth/components/atoms/PhoneInput";

import { useRouter } from "next/dist/client/router";

import { FormEventHandler, useState } from "react";

import { RootWrapper, FormWrapper } from "./styles";

interface IAuthFormFields {
  phonenumber: string;
  otp: string;
}

const AuthForm: React.FC = () => {
  const {
    fields,
    fieldValueSetter,
    fieldErrorSetter,
    getValidatedData,
    validateField,
  } = useForm<IAuthFormFields>({
    fields: {
      phonenumber: {
        required: true,
        intialValue: "",
        validators: [
          {
            validator: Validators.required,
            message: "Phone number is required",
          },
          {
            validator: Validators.phoneNumber,
            message: "Enter valid phone number.",
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

  // State
  const [showOtp, setShowOtp] = useState(false);

  const handleError = (error: Error) => {
    try {
      const errorInfo = JSON.parse(error.message);
      fieldErrorSetter("phonenumber", errorInfo.phonenumber);
      fieldErrorSetter("otp", errorInfo.otp);
    } catch (err) {
      // eslint-disable-next-line no-console
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

  const generateOtpForNumber = async () => {
    const valid = validateField("phonenumber");
    if (valid) {
      const phonenumber = fields.phonenumber.value;
      try {
        const result = await AuthApiClient.getPhoneOtp(phonenumber);
        if (result.status === 200) {
          setShowOtp(true);
        }
      } catch (err) {
        const error = JSON.parse(err.message);
        if (error.username) {
          fieldErrorSetter("phonenumber", error.username[0]);
        }
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
          autoFocus
          placeholder="Your phone number"
          onChange={(val) => {
            setShowOtp(false);
            fieldValueSetter("phonenumber", val);
          }}
          error={fields.phonenumber?.errors[0]}
        />

        {showOtp ? (
          <>
            <OtpInput
              onChange={(otp) => fieldValueSetter("otp", otp)}
              autoFocus
            />
            <Button type="submit" label="Signin" />
          </>
        ) : (
          <>
            <Button label="Get OTP" onClick={generateOtpForNumber} />
          </>
        )}
      </FormWrapper>
    </RootWrapper>
  );
};

export default AuthForm;
