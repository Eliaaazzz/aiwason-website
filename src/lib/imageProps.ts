import type { ImageProps } from 'next/image';
import { getPlaceholder } from './data/imagePlaceholders.generated';

type BlurExtras = Pick<ImageProps, 'placeholder' | 'blurDataURL'>;

export function blurProps(src: string | undefined | null): BlurExtras {
  if (typeof src !== 'string' || src.length === 0) return {};
  const clean = src.split('?')[0];
  const entry = getPlaceholder(clean);
  if (!entry) return {};
  return { placeholder: 'blur', blurDataURL: entry.blurDataURL };
}

export function imageDimensions(src: string | undefined | null) {
  if (typeof src !== 'string' || src.length === 0) return undefined;
  const clean = src.split('?')[0];
  return getPlaceholder(clean);
}
