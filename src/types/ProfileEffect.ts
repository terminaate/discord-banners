export interface EffectConfig {
	src: string;
	loop: boolean;
	height: number;
	width: number;
	duration: number;
	start: number;
	loopDelay: number;
	position: {
		x: number;
		y: number;
	};
	zIndex: number;
}

export interface ProfileEffectConfig {
	type: number;
	id: string;
	sku_id: string;
	title: string;
	description: string;
	accessibilityLabel: string;
	animationType: number;
	thumbnailPreviewSrc: string;
	reducedMotionSrc: string;
	effects: Array<EffectConfig>;
}

export interface ProfileEffect {
	id: string;
	skuId: string;
	config: ProfileEffectConfig;
}
