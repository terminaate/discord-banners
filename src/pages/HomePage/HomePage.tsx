import cl from './HomePage.module.scss';
import BasicPage from '@/components/BasicPage';
import Button from '@/components/UI/Button';
import githubIcon from '@/assets/icons/github.svg';
import { useState } from 'react';
import BuildBannerModal from '@/components/BuildBannerModal';

const HomePage = () => {
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
          <img src={githubIcon} alt={githubIcon} />
        </a>
      </BasicPage>
      <BuildBannerModal
        visible={buildBannerModal}
        setVisible={setBuildBannerModal}
      />
    </>
  );
};

export default HomePage;
