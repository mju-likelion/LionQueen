import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import BackgroundMain from '~DesignSystem/BackgroundMain';
import Button from '~DesignSystem/Button';

const Confirm = () => {
  const router = useRouter();
  const infoText = router.query.backtoLogin;

  const onClickSignin = () => {
    Router.push('/sign-in');
  };

  return (
    <BackgroundMain>
      <MainText>비밀번호 변경</MainText>
      <CrossLine />
      <InfoDiv>
        <p>{infoText || '요청하신 페이지를 찾을 수 없습니다.'}</p>
      </InfoDiv>
      <ButtonDiv>
        <Button size="large" onClick={onClickSignin}>
          로그인으로 돌아가기
        </Button>
      </ButtonDiv>
    </BackgroundMain>
  );
};
const OverLap = styled.div`
  display: flex;
  margin: 0 auto;
`;

const MainText = styled(OverLap)`
  padding-top: 44px;
  width: 256px;
  font-size: 45px;
`;

const CrossLine = styled(OverLap)`
  margin-top: 12px;
  border: 0;
  border-top: 2px solid ${({ theme }) => theme.colors.text};
  width: 600px;
`;

const InfoDiv = styled(OverLap)`
  justify-content: center;
  margin-top: 95px;
  width: 380px;
  height: 80px;
  font-size: 24px;
`;

const ButtonDiv = styled(OverLap)`
  margin-top: 77px;
  width: 240px;
`;

export default Confirm;
