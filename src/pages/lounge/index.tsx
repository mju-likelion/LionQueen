import styled from 'styled-components';

import FloorNumber from '~components/lounge/FloorDemoData';
import DoorBottom from '~components/icons/DoorBottom.svg';
import Gear from '~components/icons/Gear.svg';
import FloorButton from '~components/lounge/FloorButton';
import NameBoard from '~components/lounge/NameBoard';
import LoungeDoor from '~components/lounge/LoungeDoor';

const LoungeHome = () => {
  return (
    <LoungeBg>
      <NameBoard />
      <ListBottomContainer>
        <LoungeList>
          {FloorNumber.map(floor => (
            <FloorContainer key={floor}>
              <LoungeDoor />
              <FloorNum>{floor}</FloorNum>
            </FloorContainer>
          ))}
        </LoungeList>
        <BottomContainer>
          <FloorButton />
          <DoorBottom />
          <GearWrap>
            <Gear />
          </GearWrap>
        </BottomContainer>
      </ListBottomContainer>
    </LoungeBg>
  );
};

const LoungeBg = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.skyblue};
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;

const ListBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: 100px;
`;

const LoungeList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 624px;
  overflow: hidden;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 340px 340px;
  margin-bottom: -10px;
  height: 23%;
`;

const GearWrap = styled.div`
  margin: 85px 0 0 330px;
  cursor: pointer;
`;

const FloorContainer = styled.div`
  display: flex;
`;

const FloorNum = styled.p`
  margin: 230px 0 0 -50px;
  padding: 35px 0 10px;
  width: 65px;
  height: 67px;
  text-align: center;
  font-family: NanumBarunGothic;
  font-size: 35px;
  font-weight: 800;

  @media screen and (max-height: 900px) {
    padding: 20px 0 10px;
  }
`;

export default LoungeHome;
