const TIMER_INTERVAL = 10000; // 10 seconds

class TimerController {
  async timer() {
    const timerInterval = setInterval(async () => {
      clearInterval(timerInterval);

      // TODO: Sync with tray

      await this.timer();
    }, TIMER_INTERVAL);
  }
}

export default new TimerController();
