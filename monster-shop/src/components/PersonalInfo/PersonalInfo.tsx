import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { Button, Grid, Paper, styled } from '@mui/material';
import dayjs from 'dayjs';
import TextFieldInput from '../Inputs/TextFieldInput';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import User from '../../api/user';
import { FormValues } from '../../types/signupFormValues';
import validateDateBirth from '../../helper/validateDateBirth';
import DateInput from '../Inputs/DateInput';
import { updateUserProfile } from '../../api/requests/userProfile';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function PersonalInfo() {
  const { data } = User;
  const dataValue = dayjs(data?.dateOfBirth);
  const [editMode, setEditMode] = useState(false);
  const { control, handleSubmit } = useForm<FormValues | CustomerSignin>({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      dateOfBirth: dataValue as unknown as string,
      email: data?.email,
      password: data?.password,
    },
    mode: 'onChange',
  });

  const onSubmit = async (newData: CustomerSignin) => {
    if (
      'firstName' in newData &&
      'lastName' in newData &&
      'dateOfBirth' in newData
    )
      await updateUserProfile(
        User.data!.version,
        newData.email,
        newData.firstName as string,
        newData.lastName as string,
        dayjs(newData.dateOfBirth as dayjs.Dayjs).format('DDMMYYYY')
      );
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Item>
            <TextFieldInput
              name="firstName"
              control={control}
              label="First Name"
              required
              disabled={!editMode}
              rules={{
                required: 'First name is required',
                pattern: {
                  value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
                  message: 'Invalid first name',
                },
              }}
            />
            <TextFieldInput
              name="lastName"
              control={control}
              label="Last Name"
              required
              disabled={!editMode}
              rules={{
                required: 'Last name is required',
                pattern: {
                  value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
                  message: 'Invalid last name',
                },
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <DateInput
              name="dateOfBirth"
              control={control}
              label="Date of Birth"
              required
              disabled={!editMode}
              rules={{
                required: 'Date of Birth is required',
                validate: validateDateBirth,
              }}
            />
            <TextFieldInput
              name="email"
              control={control}
              label="E-mail"
              required
              disabled={!editMode}
              rules={{
                required: 'Enter your e-mail, required field',
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: 'Enter valid e-mail',
                },
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <TextFieldInput
              name="password"
              control={control}
              label="Password"
              required={false}
              disabled
            />
            <ColoredBtn
              type="button"
              size="small"
              variant="contained"
              disabled={false}
            >
              Change Password
            </ColoredBtn>
          </Item>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}
        >
          <Button
            type="button"
            variant="outlined"
            size="small"
            color="warning"
            sx={{ mr: 1 }}
            disabled={editMode}
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>

          <ColoredBtn
            type="submit"
            size="small"
            variant="contained"
            disabled={!editMode}
          >
            Save Changes
          </ColoredBtn>
        </Grid>
      </Grid>
    </form>
  );
}

export default PersonalInfo;
