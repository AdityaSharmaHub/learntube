declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLIFrameElement | string,
        options: {
          videoId?: string;
          playerVars?: {
            enablejsapi?: number;
            origin?: string;
            widgetid?: number;
            modestbranding?: number;
            rel?: number;
            [key: string]: any;
          };
          events?: {
            onReady?: (event: any) => void;
            onStateChange?: (event: any) => void;
            [key: string]: any;
          };
          [key: string]: any;
        }
      ) => {
        getCurrentTime: () => number;
        getDuration: () => number;
        seekTo: (seconds: number, allowSeekAhead: boolean) => void;
        playVideo: () => void;
        pauseVideo: () => void;
        destroy: () => void;
        [key: string]: any;
      };
      PlayerState: {
        UNSTARTED: -1;
        ENDED: 0;
        PLAYING: 1;
        PAUSED: 2;
        BUFFERING: 3;
        CUED: 5;
      };
      [key: string]: any;
    };
    onYouTubeIframeAPIReady: (() => void) | null;
  }
}

export {}; 