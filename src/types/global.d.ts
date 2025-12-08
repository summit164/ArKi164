/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable no-undef */
import { RootState as TypeRootState, AppDispatch as TypeAppDispatch } from '@/model/store'

declare global {
  export type RootState = TypeRootState
  export type AppDispatch = TypeAppDispatch

  export interface Window {
    Telegram: {
      WebApp: {
        initData: string
        initDataUnsafe: any
        version: string
        ready: () => void;
        expand: () => void;
        disableVerticalSwipes: () => void;
        enableClosingConfirmation: () => void;
        setHeaderColor: (param: string) => void;
        requestFullscreen: () => void;
        exitFullscreen: () => void;
        openTelegramLink: (param: string) => void;
        openLink: (param: string, options?: any) => void;
        downloadFile: (param: { url: string, file_name: string }, callback?: Function) => void;
        onEvent: (event: string, handlers: Function) => void;
        offEvent: (event: string, handlers: Function) => void;
        BackButton?: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          addEventListener: any;
          removeEventListener: any;
        };
        HapticFeedback: {
          impactOccurred: (vibrationType: string) => void;
        };
        close: () => void;
        viewportHeight: number;
      };
    };
  }
}

export {}
