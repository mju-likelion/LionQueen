import styled, { css, keyframes } from 'styled-components';

import { useState } from 'react';
import Button from '~DesignSystem/Button';
import InputGroup from '~DesignSystem/InputGroup';
import Counter from './Counter';
import Modal from '~components/ModalPopup';
import InviteModal from './InviteModal';

const PlusModal = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState<string>('');
  const [errorShow, setErrorShow] = useState(false);
  const regex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{0,11}$/;
  const [createClicked, setCreateClicked] = useState(false);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setInput(e.target.value);
    if (regex.test(input)) {
      setErrorShow(false);
    } else {
      setErrorShow(true);
    }
  };

  // 라운지 생성 post 요청 보내기 필요
  // 라운지가 생성되었다는 응답을 받아서 초대 링크 모달을 보여줄 수 있도록 로직 필요
  const onClickCreate = () => {
    setCreateClicked(true);
    // 응답을 받으면
    // setCreateClicked(false) -> InviteModal
  };

  return (
    <Modal isCancel size="large" title="라운지 생성" onClose={onClose}>
      <InputContainer>
        <InputGroup label="그룹 이름" labelDist={10} contentWidth="283px">
          <InputText value={input} onChange={onChangeInput} />
        </InputGroup>
        {errorShow && <CautionText>한글, 영문, 숫자 포함 12자 이내로 작성해주세요.</CautionText>}
      </InputContainer>
      <PeopleContainer>
        <NumPeople>인원수</NumPeople>
        <Counter />
      </PeopleContainer>
      <Button onClick={onClickCreate}>생성</Button>
      {createClicked && <CautionText loading>로 딩 중 . . .</CautionText>}
      {/* {createClicked ? (
        <CautionText loading>로 딩 중 . . .</CautionText>
      ) : (
        <InviteModal onClose={onClose} />
      )} */}
    </Modal>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 35px auto 0;
  width: 283px;
  height: 110px;
`;

const InputText = styled.input`
  border: 3px solid ${({ theme }) => theme.colors.primary.orange};
  box-shadow: 0 3px 3px rgba(0 0 0 / 25%);
  color: ${({ theme }) => theme.colors.primary.black};
  font-size: 16px;
`;

const PeopleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 40px auto 35px;
  width: 260px;
  height: 40px;
`;

const NumPeople = styled.p`
  color: ${({ theme }) => theme.colors.primary.black};
  font-size: 16px;
`;

// 글자수 초과시 에러 메시지 출력
const CautionText = styled.p<{ loading?: boolean }>`
  ${props =>
    props.loading &&
    css`
      margin: 20px 0 0 180px;
      animation: ${TextFade} 2s 1s infinite linear alternate;
      font-size: 16px;
    `}

  margin: 10px 0 0 8px;
  color: ${({ theme }) => theme.colors.primary.error};
  font-size: 13px;
`;

const TextFade = keyframes`
  0%{
    opacity: 1;
  }

  50%{
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`;

export default PlusModal;
