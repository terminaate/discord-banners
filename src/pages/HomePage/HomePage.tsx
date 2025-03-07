import cl from './HomePage.module.scss';
import { BasicPage } from '@/components/BasicPage';
import { Button } from '@/components/UI/Button';
import { useState } from 'react';
import { BuildBannerModal } from '@/components/BuildBannerModal';
import { FaGithub } from 'react-icons/fa';

export const HomePage = () => {
  const [buildBannerModal, setBuildBannerModal] = useState<boolean>(false);

  return (
    <>
      <BasicPage>
        <h1 className={cl.logoText}>DISCORD BANNERS</h1>
        <Button onClick={() => setBuildBannerModal(true)}>
          Get my own Discord Banner!
        </Button>
        <a
          href={import.meta.env.VITE_DISCORD_INVITE_LINK}
          target={'_blank'}
          className={cl.serverPrompt}
          rel="noreferrer"
        >
          For use this tool you need connect to our <span>server</span>
        </a>
        <a
          className={cl.githubButton}
          href={import.meta.env.VITE_GITHUB_LINK}
          target={'_blank'}
          rel="noreferrer"
        >
          <FaGithub size={20} />
        </a>
      </BasicPage>
      <BuildBannerModal
        visible={buildBannerModal}
        setVisible={setBuildBannerModal}
      />
    </>
  );
};
