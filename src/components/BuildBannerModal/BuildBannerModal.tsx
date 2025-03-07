import cl from './BuildBannerModal.module.scss';
import type { FC, FormEvent } from 'react';
import { Modal, Props as ModalProps } from '@/components/UI/Modal';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { useInputState } from '@/hooks/useInputState';
import { BannerService } from '@/services/BannerService';
import { useNavigate } from 'react-router-dom';

export const BuildBannerModal: FC<ModalProps> = (props) => {
  const [userIdInput, onUserIdInputChange] = useInputState('');
  const navigate = useNavigate();

  const onCancelButtonClick = () => {
    props.setVisible(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isBannerExist = Boolean(
      await BannerService.getBannerImage(userIdInput),
    );

    if (isBannerExist) {
      navigate('/banner/' + userIdInput);
    }
  };

  return (
    <Modal {...props}>
      <form onSubmit={onSubmit}>
        <h1 className={cl.titleLogo}>DISCORD BANNERS</h1>
        <h2 className={cl.tagline}>Get your own banner!</h2>
        <div className={cl.line} />
        <span className={cl.taskPrompt}>
          Enter username or user id (
          <a
            target={'_blank'}
            href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-"
            rel="noreferrer"
          >
            how to get my userid?
          </a>
          )
        </span>
        <Input
          placeholder={'Username or User ID'}
          onChange={onUserIdInputChange}
          value={userIdInput}
          required={true}
        />
        <div className={cl.buttonsContainer}>
          <Button type={'submit'}>Get my own banner!</Button>
          <Button onClick={onCancelButtonClick} background={false}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
