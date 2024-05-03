import { useFormik } from 'formik';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';

import BackgroundMain from '~DesignSystem/BackgroundMain';
import Button from '~DesignSystem/Button';

import { PasswordChangeValidationSchema } from '~lib/validation';
import Axios from '~lib/axios';
import { useAppDispatch } from '~/store';
import { FormContainer } from '~components/SignUp';
import { showNotice } from '~store/modules/notice';
import Notice from '~components/Notice/Notice';

type InitialValues = {
  password: string;
  passwordConfirm: string;
};
const Change = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChangePasswordFailure = () => {
    dispatch(showNotice('비밀번호 변경에 실패하였습니다.'));
  };

  const formError = (field: keyof InitialValues) => {
    return !!formik.values[field] && formik.touched[field] ? formik.errors[field] : undefined;
  };

  const formik = useFormik<InitialValues>({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async values => {
      try {
        await Axios.post(
          '/api/auth/reset-password',
          {
            password: values.name,
            passwordConfirm: values.email,
          },
          { withCredentials: true },
        );
        routePage();
      } catch (err) {
        handleChangePasswordFailure();
      }
    },
    validationSchema: PasswordChangeValidationSchema,
  });

  const routePage = () => {
    if (router.pathname === '/password-find/change') {
      Router.push({
        pathname: '/password-find/confirm',
        query: { backtoLogin: '비밀번호가 성공적으로 변경되었습니다.' },
      });
    }
  };

  return (
    <BackgroundMain>
      <MainText>비밀번호 변경</MainText>
      <CrossLine />
      <form onSubmit={formik.handleSubmit}>
        <InputTotalDiv>
          <FormContainer
            labelName="변경 패스워드"
            placeholder="6~10자의 영문, 숫자를 조합해서 입력하세요."
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formError('password')}
          />
          <FormContainer
            labelName="변경 패스워드 확인"
            placeholder="비밀번호를 한 번 더 입력하세요."
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
            error={formError('passwordConfirm')}
          />
        </InputTotalDiv>
        <ButtonDiv>
          <Button size="large" type="submit">
            비밀번호 변경
          </Button>
        </ButtonDiv>
      </form>
    </BackgroundMain>
  );
};
const OverLap = styled.div`
  display: flex;
  margin: 0 auto;
`;

const MainText = styled(OverLap)`
  padding-top: 46px;
  width: 256px;
  font-size: 45px;
`;

const CrossLine = styled(OverLap)`
  margin-top: 13px;
  border: 0;
  border-top: 2px solid ${({ theme }) => theme.colors.text};
  width: 600px;
`;

const InputTotalDiv = styled(OverLap)`
  display: table;
  margin-top: 72px;
  margin-left: 130px;
  font-size: 20px;

  input {
    margin-left: 15px;
    border-radius: 10px;
    width: 352px;
    height: 38px;
  }

  label {
    width: 225px;
  }

  div + div {
    margin-top: 37px;
  }

  > div > div > div > div:last-child {
    position: absolute;
    margin-top: 8px;
    margin-left: 20px;
  }
`;
const ButtonDiv = styled(OverLap)`
  margin-top: 63px;
  width: 240px;
`;

export default Change;
