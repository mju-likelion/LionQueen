/* eslint-disable @typescript-eslint/no-empty-function */

import Button from '~DesignSystem/Button';
import Modal from '~DesignSystem/Modal';

type Props = {
  children: React.ReactNode;
  title: string;
  isSingle?: boolean;
  size?: 'medium' | 'large';
  onConfirm: () => void;
  onClose?: () => void;
};

const ConfirmModal = ({
  children,
  title = '제목',
  isSingle = false,
  size = 'medium',
  onConfirm,
  onClose = () => {},
}: Props) => {
  return (
    <Modal title={title} size={size} onClose={onClose}>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={onConfirm}>확인</Button>
          {!isSingle && <Button onClick={onClose}>취소</Button>}
        </>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;