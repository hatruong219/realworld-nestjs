import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default () => ({
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: '1h',
  },
})
