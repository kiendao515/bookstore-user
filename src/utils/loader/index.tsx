import { loader as loaderDefaultOptions } from '@/utils/constant';

import asyncComponentLoader from './loader';
import type { AnyProps, LoadComponent, LoaderDefaultOptions } from './types';
import Loading from '@/ui/Loading';

const configuredAsyncComponentLoader = (
  loadComponent: LoadComponent,
  additionalProps: AnyProps = {},
  loaderOptions: LoaderDefaultOptions = loaderDefaultOptions,
  FallbackWaiting = Loading,
) => asyncComponentLoader(loadComponent, additionalProps, loaderOptions, FallbackWaiting);

export { loaderDefaultOptions };
export default configuredAsyncComponentLoader;
