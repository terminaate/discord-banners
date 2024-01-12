import BasicPage from '@/components/BasicPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cl from './BannerPage.module.scss';
import { BannerService } from '@/services/BannerService';
import { Loader } from 'src/components/UI/Loader';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

export const BannerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const onMount = async () => {
    const candidate = await BannerService.getBannerImage(id);

    if (!id || !candidate) {
      navigate('/');
    } else {
      setBannerUrl(candidate);
    }
  };

  useEffect(() => {
    void onMount();
  }, []);

  const onCopyButtonClick = async () => {
    await navigator.clipboard.writeText(String(bannerUrl));
    alert('URL copied!');
  };

  if (bannerUrl === null) {
    return null;
  }

  return (
    <>
      <BasicPage>
        <h1 className={cl.title}>Here is your banner!</h1>
        <div className={cl.mainContent}>
          <img
            className={cl.bannerImage}
            src={bannerUrl}
            alt={bannerUrl}
            onLoad={() => setIsLoaderVisible(false)}
          />
          <div className={cl.copyButtons}>
            <Input className={cl.bannerUrl} value={bannerUrl} />
            <Button onClick={onCopyButtonClick}>Copy</Button>
          </div>
        </div>
      </BasicPage>
      <Loader
        title={'We render your banner'}
        body={'please wait'}
        visible={isLoaderVisible}
      />
    </>
  );
};
