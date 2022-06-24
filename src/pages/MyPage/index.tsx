// import Link from 'next/link';
import styled from 'styled-components';
import BackgroundMain from '../../DesignSystem/BackgroundMain';
import Button from '../../DesignSystem/Button';

const MypageBg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleStyle = styled.p`
  font-size: 45px;
  margin-top: 70px;
  margin-bottom: 23px;
`;
const ButtonStyle = styled.p`
  margin-top: 28px;
`;
const MyPage = () => {
  return (
    <BackgroundMain>
      <MypageBg>
        <TitleStyle>마이페이지</TitleStyle>

        <ButtonStyle>
          {/* <Link href="/MyPage"> 이중모달 생성되면 추가 예정 */}
          <Button color="primary-orange" size="large">
            나의 정보
          </Button>
          {/* </Link> */}
        </ButtonStyle>
        <ButtonStyle>
          {/* <Link href="/MyPage/AccountWithdrawalModal"> */}
          <Button color="primary-orange" size="large">
            라운지 설정
          </Button>
          {/* </Link> */}
        </ButtonStyle>
        <ButtonStyle>
          {/* <Link href="/MyPage/LoungeLeavingModal"> */}
          <Button color="primary-orange" size="large">
            라운지 검색 / 추천
          </Button>
          {/* </Link> */}
        </ButtonStyle>
      </MypageBg>
    </BackgroundMain>
  );
};

export default MyPage;