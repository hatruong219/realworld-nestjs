import { SetMetadata } from '@nestjs/common';
import { IS_AUTH_OPTION } from 'src/constants/app.constant';

export const AuthOption = () => SetMetadata(IS_AUTH_OPTION, true);
