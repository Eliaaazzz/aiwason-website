import type { ImageProps, StaticImageData } from 'next/image';
import { getPlaceholder } from './data/imagePlaceholders.generated';

type BlurExtras = Pick<ImageProps, 'placeholder' | 'blurDataURL'>;

type ImageSrc = string | StaticImageData | undefined | null;

function toLookupKey(src: ImageSrc): string | null {
  if (typeof src === 'string') return src.length ? src.split('?')[0] : null;
  // StaticImageData already has its own blur metadata baked in by next/image
  // — no need to look up our placeholder map. Returning null falls through
  // to the empty object below so the static-import blur takes effect.
  return null;
}

export function blurProps(src: ImageSrc): BlurExtras {
  const key = toLookupKey(src);
  if (!key) return {};
  const entry = getPlaceholder(key);
  if (!entry) return {};
  return { placeholder: 'blur', blurDataURL: entry.blurDataURL };
}

export function imageDimensions(src: ImageSrc) {
  const key = toLookupKey(src);
  if (!key) return undefined;
  return getPlaceholder(key);
}
