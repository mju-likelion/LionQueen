/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ModalPopup from '~components/ModalPopup';
import Axios from '~lib/axios';
import { useAppDispatch } from '~/store';
import { showNotice } from '~store/modules/notice';
import useGetLoungeList from '~/hooks/myPage/useGetLoungeList';
import Notice from '~/components/Notice';

type lounge = {
  id: string;
  name: string;
};

const MyInfo = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loungeOutModalShow, setLoungeOutModalShow] = useState(false);
  const [withdrawalModalShow, setWithdrawalModalShow] = useState(false);
  const [loungeOutId, setLoungeOutId] = useState('');

  // 라운지 리스트와 이름 get
  const { data: loungeNames, error, isLoading } = useGetLoungeList();

  // 라운지 탈퇴
  const goodByeLounge = async (id: string) => {
    try {
      if (loungeOutModalShow) {
        handleNotice('라운지를 탈퇴했습니다.');
        await Axios.delete(`/api/rooms/${id}`, { withCredentials: true });
        router.push('/');
      }
    } catch (err) {
      handleNotice('라운지 탈퇴에 실패했습니다.');
    }
  };

  // 라이언타운 계정 삭제
  const goodByeLionTown = async () => {
    try {
      if (withdrawalModalShow) {
        handleNotice('안녕히 가세요.');
        await Axios.delete('/api/auth/sign-drop', { withCredentials: true });
        router.push('/');
      }
    } catch (err) {
      handleNotice('회원 탈퇴에 실패했습니다.');
    }
  };

  // 다음 코드는 mvp 이후에 작업하려고 코드 살려뒀습니다.
  const onClickSave = () => {
    handleNotice('저장되었습니다.');
  };

  // 토스트 메시지
  const handleNotice = (message: string) => {
    dispatch(showNotice(message));
  };

  // 상태에 따른 렌더링
  if (error) {
    return handleNotice('알 수 없는 에러가 발생했습니다.');
  }

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Notice />
      <ModalPopup size="large" title="내 정보" onClose={onClose} isCancel>
        <InfoBox>
          <NameBox>
            <NameTitle>이름</NameTitle>
            <NameInfo>
              <NameText type="text" maxLength={6} value={loungeNames.user.name} readOnly />
              <NameSaveButton onClick={onClickSave}>저장</NameSaveButton>
            </NameInfo>
          </NameBox>
          <LoungeBox>
            <LoungeTitle>소속 라운지</LoungeTitle>
            <LoungeInfo>
              {loungeNames.loungeNames.map((lounge: lounge) => (
                <LoungeRow key={lounge.id}>
                  <LoungeName>{lounge.name}</LoungeName>
                  <LoungeOutButton
                    onClick={() => {
                      setLoungeOutModalShow(true);
                      setLoungeOutId(lounge.id);
                    }}
                  >
                    탈퇴
                  </LoungeOutButton>
                </LoungeRow>
              ))}
            </LoungeInfo>
          </LoungeBox>
          <WithdrawalButton
            onClick={() => {
              setWithdrawalModalShow(true);
            }}
          >
            계정삭제
          </WithdrawalButton>
        </InfoBox>
      </ModalPopup>

      {/* //소속 라운지 탈퇴 모달 */}
      {loungeOutModalShow && (
        <ModalPopup
          size="medium"
          title="소속 라운지 탈퇴"
          onClose={() => {
            setLoungeOutModalShow(false);
          }}
          onConfirm={() => {
            setLoungeOutModalShow(false);
            goodByeLounge(loungeOutId);
          }}
        >
          정말 [라운지이름]을 탈퇴하시겠습니까?
        </ModalPopup>
      )}

      {/* //소속 라운지 탈퇴 모달 */}
      {withdrawalModalShow && (
        <ModalPopup
          size="medium"
          title="계정 삭제"
          onClose={() => {
            setWithdrawalModalShow(false);
          }}
          onConfirm={() => {
            setWithdrawalModalShow(false);
            goodByeLionTown();
          }}
        >
          <GoodbyeText>정말로 라이언타운과 작별 인사를 하시겠습니까?</GoodbyeText>
          <GoodbyeText>*추후 계정 복구는 불가능합니다.</GoodbyeText>
        </ModalPopup>
      )}
    </div>
  );
};

// 내 정보 모달UI
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

// 이름 정보
const NameBox = styled.div`
  width: 315px;
`;

const NameTitle = styled.p`
  margin-bottom: 5px;
  margin-left: 10px;
  text-align: left;
  line-height: 18px;
  font-size: 20px;
`;

const NameInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-radius: 15px;
  width: 315px;
  height: 41px;
`;

const NameText = styled.input`
  margin: 8px 0 7px 13px;
  border: none;
  font-size: 18px;

  :focus {
    outline: none;
  }
`;

const NameSaveButton = styled.button`
  margin: 8px 12px 7px 0;
  color: ${({ theme }) => theme.colors.primary.green};
  font-size: 16px;
`;

// 라운지 정보
const LoungeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const LoungeTitle = styled.p`
  margin-bottom: 5px;
  margin-left: 10px;
  text-align: left;
  line-height: 18px;
  font-size: 20px;
`;

const LoungeInfo = styled.div`
  border: 1px solid;
  border-radius: 15px 5px 5px 15px;
  width: 315px;
  height: 192px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.primary.lightgreen}; /* 스크롤바의 색상 */
    height: 30%; /* 스크롤바의 길이 */
  }

  &::-webkit-scrollbar-track {
    background: rgb(255 144 224 / 10%); /* 스크롤바 뒷 배경 색상 */
  }
`;

const LoungeName = styled.div`
  display: block;
  margin: 8px 0 3px 13px;
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
`;

const LoungeRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const LoungeOutButton = styled.button`
  margin: 8px 12px 3px 0;
  color: ${({ theme }) => theme.colors.primary.error};
  font-size: 16px;
`;

// 계정 삭제 버튼
const WithdrawalButton = styled.button`
  margin: 14px 0 8px 230px;
  color: #bd2517;
  font-size: 17px;
`;

const GoodbyeText = styled.p`
  margin: 10px 0;
  font-size: 17px;
`;

export default MyInfo;
