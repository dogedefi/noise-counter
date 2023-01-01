import { scheduleJob } from 'node-schedule';
import Logger from 'electron-log';
import fileUrl from 'file-url';
import path from 'path';
import os from 'os';

export const logger = Logger.scope('noise-counter');

export default (infinity?: boolean) => {
  const noiseA = new Audio();
  noiseA.src = fileUrl(
    path.join(os.homedir(), 'Users/.noise-counter', 'noise-a.mp3')
  );
  noiseA.volume = 1;
  noiseA.loop = true;

  const noiseB = new Audio(); // Doge
  noiseB.src = fileUrl(
    path.join(os.homedir(), 'Users/.noise-counter', 'noise-b.mp3')
  );
  noiseB.volume = 1;
  noiseB.loop = true;

  const noiseC = new Audio(); // Doge
  noiseC.src = fileUrl(
    path.join(os.homedir(), 'Users/.noise-counter', 'noise-c.mp3')
  );
  noiseC.volume = 1;
  noiseC.loop = true;

  if (infinity) {
    (function start() {
      noiseA.play();
      noiseB.play();
      noiseC.play();
      setTimeout(() => {
        noiseA.pause();
        noiseB.pause();
        noiseC.pause();
        setTimeout(start, 1000 * 60 * 15);
      }, 1000 * 60 * 40);
    })();
  } else {
    {
      const date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      scheduleJob(date, () => {
        // reload at AM 00:00:00
        logger.info('reload at AM 00:00:00');
        window.location.reload();
      });
    }

    {
      const date = new Date();
      date.setHours(2);
      date.setMinutes(0);
      date.setSeconds(0);
      scheduleJob(date, () => {
        // start at AM 02:00:00
        logger.info('start at AM 02:00:00');
        noiseA.play();
        noiseB.play();
        noiseC.play();
      });
    }

    {
      const date = new Date();
      date.setHours(2);
      date.setMinutes(55);
      date.setSeconds(0);
      scheduleJob(date, () => {
        // pause at AM 02:55:00
        logger.info('pause at AM 02:55:00');
        noiseA.pause();
        noiseB.pause();
        noiseC.pause();
      });
    }

    {
      const date = new Date();
      date.setHours(3);
      date.setMinutes(10);
      date.setSeconds(0);
      scheduleJob(date, () => {
        // play at AM 03:10:00, take a 15-minutes break
        logger.info('play at AM 03:10:00, take a 15-minutes break');
        noiseA.play();
        noiseB.play();
        noiseC.play();
      });
    }

    {
      const date = new Date();
      date.setHours(4);
      date.setMinutes(0);
      date.setSeconds(0);
      scheduleJob(date, () => {
        // pause at AM 04:00:00
        logger.info('stop at AM 04:00:00');
        logger.info('Have a good dream upstairs...');
        noiseA.pause();
        noiseB.pause();
        noiseC.pause();

        // clear
        noiseA.src = '';
        noiseB.src = '';
        noiseC.src = '';
      });
    }
  }
};
