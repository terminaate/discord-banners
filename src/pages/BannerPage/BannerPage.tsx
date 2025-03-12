import { BasicPage } from '@/components/BasicPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cl from './BannerPage.module.scss';
import { BannerService } from '@/services/BannerService';
import { Loader } from 'src/components/UI/Loader';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { Select, SelectVariant } from '@/components/UI/Select';
import { ProfileEffect } from '@/types/ProfileEffect';
import { ProfileEffectsService } from '@/services/ProfileEffectsService';
import { AvatarDecoration } from '@/types/AvatarDecoration';
import { AvatarDecorationsService } from '@/services/AvatarDecorationsService';

export const BannerPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);

  const [bannerSVG, setBannerSVG] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string>(
    BannerService.getBannerURL(userId ?? ''),
  );

  const [selectedProfileEffect, setSelectedProfileEffect] =
    useState<SelectVariant>();
  const [profileEffects, setProfileEffects] = useState<ProfileEffect[]>([]);

  const [selectedAvatarDecoration, setSelectedAvatarDecoration] =
    useState<SelectVariant>();
  const [avatarDecorations, setAvatarDecorations] = useState<
    AvatarDecoration[]
  >([]);

  const onBannerUrlChange = async () => {
    const searchParams = new URLSearchParams();

    if (selectedAvatarDecoration?.key) {
      searchParams.set('decoration', selectedAvatarDecoration.key);
    }

    if (selectedProfileEffect?.key) {
      searchParams.set('profileEffect', selectedProfileEffect?.key);
    }

    setIsLoaderVisible(true);
    const candidate = await BannerService.getBannerImage(userId, searchParams);

    if (!userId || !candidate) {
      navigate('/');
      return;
    }

    setIsLoaderVisible(false);

    setBannerSVG(candidate);
    setBannerUrl((prev) => {
      const url = new URL(prev);

      for (const [key, value] of searchParams) {
        url.searchParams.set(key, value);
      }

      return url.toString();
    });
  };

  useEffect(() => {
    void onBannerUrlChange();
  }, [selectedProfileEffect, selectedAvatarDecoration]);

  const onMount = async () => {
    const candidate = await BannerService.getBannerImage(userId);

    if (!userId || !candidate) {
      navigate('/');
      return;
    }

    setBannerSVG(candidate);
    setProfileEffects(await ProfileEffectsService.getAll());
    setAvatarDecorations(await AvatarDecorationsService.getAll());
    setIsLoaderVisible(false);
  };

  useEffect(() => {
    void onMount();
  }, []);

  const onCopyButtonClick = async () => {
    await navigator.clipboard.writeText(bannerUrl);

    alert('URL copied!');
  };

  const onBackButtonClick = () => {
    navigate('/');
  };

  const onProfileEffectSelectChange = (newValue: SelectVariant) => {
    setSelectedProfileEffect(newValue);
  };

  const onAvatarDecorationSelectChange = (newValue: SelectVariant) => {
    setSelectedAvatarDecoration(newValue);
  };

  if (bannerSVG === null) {
    return null;
  }

  return (
    <>
      <BasicPage className={cl.page}>
        <h1 className={cl.title}>Here is your banner!</h1>

        <div className={cl.mainContent}>
          <div
            className={cl.bannerImage}
            dangerouslySetInnerHTML={{ __html: bannerSVG ?? '' }}
          />

          <div className={cl.copyButtons}>
            <Input className={cl.bannerUrl} value={bannerUrl} />
            <Button onClick={onCopyButtonClick}>Copy</Button>
          </div>

          <Select
            value={selectedProfileEffect}
            onChange={onProfileEffectSelectChange}
            className={cl.assetSelect}
            variants={profileEffects.map((p) => ({
              name: p.config.title,
              key: p.id,
            }))}
          />

          <Select
            value={selectedAvatarDecoration}
            onChange={onAvatarDecorationSelectChange}
            className={cl.assetSelect}
            variants={avatarDecorations.map((p) => ({
              name: p.name,
              key: p.asset,
            }))}
          />

          <Button onClick={onBackButtonClick} className={cl.backButton}>
            Get next banner
          </Button>
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
