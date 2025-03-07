import { BasicPage } from '@/components/BasicPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cl from './BannerPage.module.scss';
import { BannerService } from '@/services/BannerService';
import { Loader } from 'src/components/UI/Loader';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';

export const BannerPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);
  const [bannerSVG, setBannerSVG] = useState<string | null>(null);

  const onMount = async () => {
    const candidate = await BannerService.getBannerImage(userId);

    if (!userId || !candidate) {
      navigate('/');
    } else {
      setBannerSVG(candidate);
      setIsLoaderVisible(false);
    }
  };

  useEffect(() => {
    void onMount();
  }, []);

  const onCopyButtonClick = async () => {
    await navigator.clipboard.writeText(
      BannerService.getBannerURL(userId ?? ''),
    );

    alert('URL copied!');
  };

  if (bannerSVG === null) {
    return null;
  }

  return (
    <>
      <BasicPage>
        <h1 className={cl.title}>Here is your banner!</h1>
        <div className={cl.mainContent}>
          <div
            className={cl.bannerImage}
            dangerouslySetInnerHTML={{ __html: bannerSVG ?? '' }}
          />
          <div className={cl.copyButtons}>
            <Input
              className={cl.bannerUrl}
              value={BannerService.getBannerURL(userId ?? '')}
            />
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
