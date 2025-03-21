import { BasicPage } from '@/components/BasicPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cl from './BannerPage.module.scss';
import { BannerService } from '@/services/BannerService';
import { Loader } from 'src/components/UI/Loader';
import { Button } from '@/components/UI/Button';
import { Select, SelectVariant } from '@/components/UI/Select';
import { Input } from '@/components/UI/Input';
import axios from 'axios';
import { ProfileEffect } from '@/types/ProfileEffect';
import { AvatarDecoration } from '@/types/AvatarDecoration';
import { ProfileEffectsService } from '@/services/ProfileEffectsService';
import { AvatarDecorationsService } from '@/services/AvatarDecorationsService';
import { Checkbox } from '@/components/UI/Checkbox';

type BannerOptions = {
  fakeProfile: boolean;
  animated: boolean;
  profileEffect?: string;
  decoration?: string;
};

const useBannerUrl = (
  userId: string | undefined,
  opts: BannerOptions,
): [string, string | null, boolean] => {
  const [bannerSVG, setBannerSVG] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string>(
    BannerService.getBannerURL(userId ?? ''),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newBannerUrl = new URL(BannerService.getBannerURL(userId ?? ''));

    for (const [i, value] of Object.entries(opts)) {
      const key = i as keyof BannerOptions;
      if (opts[key] !== undefined) {
        newBannerUrl.searchParams.set(key, String(value));
      }
    }

    setBannerUrl(newBannerUrl.toString());
  }, [opts]);

  const fetchBannerSvg = async () => {
    setIsLoading(true);
    const { data } = await axios.get(bannerUrl);
    setIsLoading(false);

    setBannerSVG(data);
  };

  useEffect(() => {
    void fetchBannerSvg();
  }, [bannerUrl]);

  return [bannerUrl, bannerSVG, isLoading];
};

export const BannerPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [selectedProfileEffect, setSelectedProfileEffect] =
    useState<SelectVariant>();
  const [selectedAvatarDecoration, setSelectedAvatarDecoration] =
    useState<SelectVariant>();
  const [fakeProfileInput, setFakeProfileInput] = useState(false);
  const [animatedInput, setAnimatedInput] = useState(true);

  const [bannerUrl, bannerSvg, isLoading] = useBannerUrl(userId, {
    animated: animatedInput,
    fakeProfile: fakeProfileInput,
    profileEffect: selectedProfileEffect?.key,
    decoration: selectedAvatarDecoration?.key,
  });

  const [profileEffects, setProfileEffects] = useState<ProfileEffect[]>([]);
  const [avatarDecorations, setAvatarDecorations] = useState<
    AvatarDecoration[]
  >([]);

  const onMount = async () => {
    if (!userId) {
      return navigate('/');
    }

    setProfileEffects(await ProfileEffectsService.getAll());
    setAvatarDecorations(await AvatarDecorationsService.getAll());
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

  if (bannerSvg === null) {
    return null;
  }

  return (
    <>
      <BasicPage className={cl.page}>
        <div className={cl.bannerContainer}>
          <div
            className={cl.bannerImage}
            dangerouslySetInnerHTML={{ __html: bannerSvg ?? '' }}
          />

          <div className={cl.bannerUrlContainer}>
            <Input className={cl.bannerUrl} value={bannerUrl} />
            <Button onClick={onCopyButtonClick}>Copy</Button>
          </div>

          <Button onClick={onBackButtonClick} className={cl.backButton}>
            Get next banner
          </Button>
        </div>

        <div className={cl.settingsContainer}>
          <h4 className={cl.settingsTitle}>Settings</h4>

          <label>
            Profile effect
            <Select
              value={selectedProfileEffect}
              onChange={onProfileEffectSelectChange}
              className={cl.assetSelect}
              variants={profileEffects.map((p) => ({
                name: p.config.title,
                key: p.id,
              }))}
            />
          </label>

          <label>
            Avatar decoration
            <Select
              value={selectedAvatarDecoration}
              onChange={onAvatarDecorationSelectChange}
              className={cl.assetSelect}
              variants={avatarDecorations.map((p) => ({
                name: p.name,
                key: p.asset,
              }))}
            />
          </label>

          <div className={cl.settingsBooleans}>
            <label>
              Animated
              <Checkbox
                checked={animatedInput}
                onChange={(e) => setAnimatedInput(e.target.checked)}
              />
            </label>

            <label>
              <a href="" rel={'noreferrer'}>
                Fake profile
              </a>
              <Checkbox
                checked={fakeProfileInput}
                onChange={(e) => setFakeProfileInput(e.target.checked)}
              />
            </label>
          </div>
        </div>
      </BasicPage>
      <Loader
        title={'We render your banner'}
        body={'please wait'}
        visible={isLoading}
      />
    </>
  );
};
