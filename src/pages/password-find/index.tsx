import { useFormik } from 'formik';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';

import BackgroundMain from '~DesignSystem/BackgroundMain';
import Button from '~DesignSystem/Button';
import { PasswordFindValidationSchema } from '~lib/validation';
import Axios from '~lib/axios';
import { useAppDispatch } from '~/store';
import { FormContainer } from '~components/SignUp';
import { showNotice } from '~store/modules/notice';
import Notice from '~components/Notice/Notice';

type InitialValues = {
  name: string;
  email: string;
};

const Find = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSendMailFailure = () => {
    dispatch(showNotice('이메일 전송에 실패하였습니다.'));
  };

  const formError = (field: keyof InitialValues) => {
    return !!formik.values[field] && formik.touched[field] ? formik.errors[field] : undefined;
  };

  const formik = useFormik<InitialValues>({
    initialValues: {
      name: '',
      email: '',
    },
    onSubmit: async values => {
      try {
        await Axios.post(
          '/api/auth/reset-password',
          {
            name: values.name,
            email: values.email,
          },
          { withCredentials: true },
        );
        routePage();
      } catch (err) {
        handleSendMailFailure();
      }
    },
    validationSchema: PasswordFindValidationSchema,
  });

  const routePage = () => {
    if (router.pathname === '/password-find') {
      Router.push({
        pathname: '/password-find/confirm',
        query: { backtoLogin: '이메일 전송이 완료되었습니다.' },
      });
    }
  };

  return (
    <BackgroundMain>
      <MainText>비밀번호 찾기</MainText>
      <CrossLine />
      <InfoDiv>
        <p>본인확인 이메일로 인증</p>
        <p>본인확인 이메일 주소와 입력한 이메일 주소가 같아야 인증번호를 받을 수 있습니다.</p>
      </InfoDiv>
      <form onSubmit={formik.handleSubmit}>
        <InputTotalDiv>
          <FormContainer
            labelName="이름"
            placeholder="이름을 입력하세요"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <FormContainer
            labelName="이메일 주소"
            placeholder="이메일 주소를 입력하세요"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formError('email')}
          />
        </InputTotalDiv>
        <ButtonDiv>
          <Button size="medium" type="submit">
            이메일 전송
          </Button>
        </ButtonDiv>
      </form>
      <Notice />
    </BackgroundMain>
  );
};

const OverLap = styled.div`
  display: flex;
  margin: 0 auto;
`;

const MainText = styled(OverLap)`
  padding-top: 45px;
  width: 245px;
  font-size: 45px;
`;

const CrossLine = styled(OverLap)`
  margin-top: 13px;
  border: 0;
  border-top: 2px solid black;
  width: 600px;
`;

const InfoDiv = styled(OverLap)`
  flex-direction: column;
  margin-top: 28px;
  width: 514px;
  height: 80px;
  white-space: pre-wrap;

  p:first-child {
    margin-top: 0;
    font-size: 24px;
  }

  p:last-child {
    margin-top: 0;
    font-size: 16px;
  }
`;

const InputTotalDiv = styled(OverLap)`
  display: table;
  margin-top: 41px;
  margin-left: 244px;
  width: 546px;
  height: 36px;
  font-size: 20px;

  input {
    margin-left: 48px;
    border-radius: 10px;
    width: 306px;
    height: 38px;
  }

  div + div {
    margin-bottom: 8px;
  }

  label {
    margin-left: -80px;
    width: 168px;
  }

  > div:last-child > div > div > div:last-child {
    margin-left: 52px;
    width: 290px;
  }

  input::placeholder {
    font-size: 14px;
  }
`;

const ButtonDiv = styled(OverLap)`
  position: absolute;
  bottom: 130px;
  left: 427px;
  width: 160px;
  height: 40px;
`;

export default Find;
